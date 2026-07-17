import { Flex, Spacer } from "@artsy/palette-mobile"
import { graphql } from "react-relay"

import { HomeArtworkRailsQuery } from "__generated__/HomeArtworkRailsQuery.graphql"
import { ArtworkRail } from "Scenes/Home/ArtworkRail"
import { useSystemQueryLoader } from "system/relay/useSystemQueryLoader"

/**
 * A few read-only artwork rails for the Home screen. Each rail is the same
 * public listings query (`getPublicArtworkListings`, no auth/subscription
 * needed — `subscriptionId` is intentionally empty, mirroring the web client)
 * sliced with a different static `listingDomain` filter.
 */
export const HomeArtworkRails = () => {
  const data = useSystemQueryLoader<HomeArtworkRailsQuery>(
    graphql`
      query HomeArtworkRailsQuery {
        marketplace: getPublicArtworkListings(
          input: { subscriptionId: "", page: 1, pageSize: 10 }
        ) {
          results {
            ...ArtworkRail_listing
          }
        }
        auctions: getPublicArtworkListings(
          input: {
            subscriptionId: ""
            page: 1
            pageSize: 10
            filters: { listingDomain: { keys: ["ARTNET_AUCTION"] } }
          }
        ) {
          results {
            ...ArtworkRail_listing
          }
        }
        galleries: getPublicArtworkListings(
          input: {
            subscriptionId: ""
            page: 1
            pageSize: 10
            filters: { listingDomain: { keys: ["GALLERY"] } }
          }
        ) {
          results {
            ...ArtworkRail_listing
          }
        }
      }
    `,
    {}
  )

  return (
    <Flex>
      <ArtworkRail title="On Artnet" listings={data.marketplace.results} />
      <Spacer y={2} />
      <ArtworkRail title="Auction lots" listings={data.auctions.results} />
      <Spacer y={2} />
      <ArtworkRail title="From galleries" listings={data.galleries.results} />
    </Flex>
  )
}
