/**
 * Relay record-id resolver for the Artnet gateway.
 *
 * The gateway does NOT guarantee globally-unique ids: e.g. an
 * `ArtListingSummary` and its nested `ListingData` can come back with the same
 * `id`. Relay uses the raw `id` as its cache key, so it merges those into one
 * record and logs `Invalid record … conflicting types 'ArtListingSummary' and
 * 'ListingData'`. Keying records by `type:id` keeps records of different types
 * in distinct cache entries. Records without an `id` return `undefined`, so
 * Relay falls back to its default client-generated id (path-based).
 */
export const getDataID = (
  fieldValue: Record<string, unknown>,
  typeName: string
): string | undefined => {
  const { id } = fieldValue
  return id == null ? undefined : `${typeName}:${String(id)}`
}
