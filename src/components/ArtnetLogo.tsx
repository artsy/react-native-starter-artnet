import { Text } from "@artsy/palette-mobile"

/**
 * The "artnet" wordmark, used as a small header logo. Rendered as styled text
 * rather than a bundled brand image (the starter ships none) — swap in the real
 * Artnet logo asset here when one is available, without touching call sites.
 */
export const ArtnetLogo = () => (
  <Text
    variant="md"
    weight="medium"
    accessibilityRole="header"
    accessibilityLabel="Artnet"
  >
    artnet
  </Text>
)
