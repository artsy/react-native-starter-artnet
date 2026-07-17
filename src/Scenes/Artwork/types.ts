/**
 * Basic artwork details shown on the Artwork screen. These are passed as
 * navigation params from the tapped rail card (which already has them from the
 * `getPublicArtworkListings` query) — the screen is intentionally simple and
 * doesn't refetch. `baseImageUrl` is the raw Artnet CDN path; the screen sizes
 * it for display.
 */
export type ArtworkDetailParams = {
  title: string
  artistName?: string
  medium?: string
  year?: string
  institutionName?: string
  saleName?: string
  baseImageUrl?: string
}

export type ArtworkStackParamList = {
  Artwork: ArtworkDetailParams
}
