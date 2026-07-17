import { Flex, Image, Spacer, Text } from "@artsy/palette-mobile"
import { FlashList } from "@shopify/flash-list"
import { graphql,useFragment } from "react-relay"

import { ArtworkRail_listing$key } from "__generated__/ArtworkRail_listing.graphql"
import { artnetListingImageURL } from "helpers/artnetImages"
import { GlobalStore } from "store/GlobalStore"

const CARD_WIDTH = 160

const ArtworkRailFragment = graphql`
  fragment ArtworkRail_listing on ArtListingSummary {
    id
    featuredImage {
      baseImageUrl
    }
    listingData {
      title
    }
    artMarketInstitution {
      name
    }
  }
`

interface ArtworkRailCardProps {
  listing: ArtworkRail_listing$key
  imagesURL: string
}

const ArtworkRailCard: React.FC<ArtworkRailCardProps> = ({
  listing,
  imagesURL,
}) => {
  const data = useFragment(ArtworkRailFragment, listing)
  const imageURL = artnetListingImageURL(
    imagesURL,
    data.featuredImage?.baseImageUrl,
    CARD_WIDTH * 2
  )

  return (
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
        <Flex width={CARD_WIDTH} height={CARD_WIDTH} backgroundColor="mono10" />
      )}
      <Spacer y={0.5} />
      <Text variant="xs" numberOfLines={2}>
        {data.listingData.title ?? "Untitled"}
      </Text>
      {!!data.artMarketInstitution?.name && (
        <Text variant="xs" color="mono60" numberOfLines={1}>
          {data.artMarketInstitution.name}
        </Text>
      )}
    </Flex>
  )
}

interface ArtworkRailProps {
  title: string
  listings: readonly ArtworkRail_listing$key[]
}

/**
 * A horizontally-scrolling rail of artwork listings. Non-interactive (cards are
 * not tappable) — a lightweight, read-only mirror of Artnet's marketplace rows.
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
