import { Flex, Image, Spacer, Text, Touchable } from "@artsy/palette-mobile"
import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { graphql, useFragment } from "react-relay"

import { ArtworkRail_listing$key } from "__generated__/ArtworkRail_listing.graphql"
import { artnetListingImageURL } from "helpers/artnetImages"
import { GlobalStore } from "store/GlobalStore"

const CARD_WIDTH = 160

const ArtworkRailFragment = graphql`
  fragment ArtworkRail_listing on ArtListingSummary {
    id
    saleName
    featuredImage {
      baseImageUrl
    }
    listingData {
      title
      artworks {
        creator {
          name
        }
        mediumRaw
        creationYearFrom
        creationYearTo
      }
    }
    artMarketInstitution {
      name
    }
  }
`

/** "2020", "2018–2020", or undefined. */
const formatYear = (from?: number | null, to?: number | null) => {
  if (from && to && from !== to) {
    return `${from}–${to}`
  }
  return (from ?? to)?.toString()
}

interface ArtworkRailCardProps {
  listing: ArtworkRail_listing$key
  imagesURL: string
}

const ArtworkRailCard: React.FC<ArtworkRailCardProps> = ({
  listing,
  imagesURL,
}) => {
  const navigation = useNavigation()
  const data = useFragment(ArtworkRailFragment, listing)
  const imageURL = artnetListingImageURL(
    imagesURL,
    data.featuredImage?.baseImageUrl,
    CARD_WIDTH * 2
  )

  const artwork = data.listingData.artworks[0]
  const title = data.listingData.title ?? "Untitled"

  const openArtwork = () => {
    navigation.navigate("Artwork", {
      title,
      artistName: artwork?.creator?.name ?? undefined,
      medium: artwork?.mediumRaw ?? undefined,
      year: formatYear(artwork?.creationYearFrom, artwork?.creationYearTo),
      institutionName: data.artMarketInstitution?.name ?? undefined,
      saleName: data.saleName ?? undefined,
      baseImageUrl: data.featuredImage?.baseImageUrl ?? undefined,
    })
  }

  return (
    <Touchable
      accessibilityRole="button"
      accessibilityLabel={`View ${title}`}
      accessibilityHint="Opens the artwork details"
      onPress={openArtwork}
    >
      <Flex width={CARD_WIDTH}>
        {imageURL ? (
          // performResize={false}: the URL is already an Artnet CDN URL — don't
          // route it through palette's Gemini (Artsy) resizer.
          <Image
            src={imageURL}
            width={CARD_WIDTH}
            height={CARD_WIDTH}
            performResize={false}
          />
        ) : (
          <Flex
            width={CARD_WIDTH}
            height={CARD_WIDTH}
            backgroundColor="mono10"
          />
        )}
        <Spacer y={0.5} />
        <Text variant="xs" numberOfLines={2}>
          {title}
        </Text>
        {!!data.artMarketInstitution?.name && (
          <Text variant="xs" color="mono60" numberOfLines={1}>
            {data.artMarketInstitution.name}
          </Text>
        )}
      </Flex>
    </Touchable>
  )
}

interface ArtworkRailProps {
  title: string
  listings: readonly ArtworkRail_listing$key[]
}

/**
 * A horizontally-scrolling rail of artwork listings. Tapping a card opens the
 * Artwork detail screen with that listing's basic details.
 */
export const ArtworkRail: React.FC<ArtworkRailProps> = ({
  title,
  listings,
}) => {
  const imagesURL = GlobalStore.useAppState(
    (state) => state.config.environment.strings.imagesURL
  )

  if (listings.length === 0) {
    return null
  }

  return (
    <Flex>
      <Flex px={2}>
        <Text variant="sm-display">{title}</Text>
      </Flex>
      <Spacer y={1} />
      <FlashList
        horizontal
        data={listings}
        keyExtractor={(_, index) => String(index)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <Spacer x={1} />}
        renderItem={({ item }) => (
          <ArtworkRailCard listing={item} imagesURL={imagesURL} />
        )}
      />
    </Flex>
  )
}
