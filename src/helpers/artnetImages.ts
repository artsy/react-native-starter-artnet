/**
 * Builds a ready-to-use Artnet image URL from a listing's `baseImageUrl`.
 *
 * `ArtListingSummary.featuredImage.baseImageUrl` is a **relative** path (leading
 * slash), e.g. `/webservices/picture.aspx?...`. Artnet serves resized images
 * through a Cloudflare image-resizer on the environment's image host:
 *
 *   {imagesURL}/cdn-cgi/image/width=W,height=H{baseImageUrl}
 *
 * `imagesURL` comes from the environment (see `EnvironmentModel` — derived from
 * the web URL, e.g. https://images.artnet-dev.com on staging).
 */
export const artnetListingImageURL = (
  imagesURL: string,
  baseImageUrl: string | null | undefined,
  size = 400
): string | null => {
  if (!baseImageUrl) {
    return null
  }
  // `baseImageUrl` already begins with `/`, so concatenate directly.
  return `${imagesURL}/cdn-cgi/image/width=${size},height=${size}${baseImageUrl}`
}
