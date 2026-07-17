import { Flex, Image, Spacer, Text } from "@artsy/palette-mobile"
import type { StaticScreenProps } from "@react-navigation/native"
import { ScrollView, useWindowDimensions } from "react-native"

import { artnetListingImageURL } from "helpers/artnetImages"
import { ArtworkStackParamList } from "Scenes/Artwork/types"
import { GlobalStore } from "store/GlobalStore"

type Props = StaticScreenProps<ArtworkStackParamList["Artwork"]>

/**
 * A simple, read-only artwork detail screen. Renders the basic details handed
 * over as navigation params by the tapped rail card (see `ArtworkStackParamList`).
 */
export const ArtworkScreen = ({ route }: Props) => {
  const { title, artistName, medium, year, institutionName, saleName, baseImageUrl } =
    route.params
  const { width } = useWindowDimensions()
  const imagesURL = GlobalStore.useAppState(
    (state) => state.config.environment.strings.imagesURL
  )

  const imageSize = width - 32
  const imageURL = artnetListingImageURL(imagesURL, baseImageUrl, imageSize * 2)

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {imageURL ? (
        <Image
          src={imageURL}
          width={imageSize}
          height={imageSize}
          performResize={false}
        />
      ) : (
        <Flex width={imageSize} height={imageSize} backgroundColor="mono10" />
      )}

      <Spacer y={2} />

      <Text variant="lg-display">{title}</Text>

      {!!artistName && (
        <>
          <Spacer y={0.5} />
          <Text variant="sm">{artistName}</Text>
        </>
      )}

      {!!medium && (
        <>
          <Spacer y={0.5} />
          <Text variant="sm" color="mono60">
            {medium}
          </Text>
        </>
      )}

      {!!year && (
        <>
          <Spacer y={0.5} />
          <Text variant="sm" color="mono60">
            {year}
          </Text>
        </>
      )}

      {!!institutionName && (
        <>
          <Spacer y={1} />
          <Text variant="xs" color="mono60">
            {institutionName}
          </Text>
        </>
      )}

      {!!saleName && (
        <>
          <Spacer y={0.5} />
          <Text variant="xs" color="mono60">
            {saleName}
          </Text>
        </>
      )}
    </ScrollView>
  )
}
