import { Flex, Spacer } from "@artsy/palette-mobile"
import { Fragment } from "react"
import { graphql } from "react-relay"

import { HomeArtworkRailsQuery } from "__generated__/HomeArtworkRailsQuery.graphql"
import { ArtworkRail } from "Scenes/Home/ArtworkRail"
import { useSystemQueryLoader } from "system/relay/useSystemQueryLoader"

/**
 * A few read-only artwork rails for the Home screen. We fetch ONE unfiltered
 * page of public listings (`getPublicArtworkListings`, no auth/subscription
 * needed — `subscriptionId` is intentionally empty, mirroring the web client)
 * and split it into rails client-side by each listing's `listingDomain`.
 *
 * Why not a server-side `listingDomain` filter (one query per rail)? The public
 * endpoint rejects that filter criterion outright (`INVALID_ARGUMENT: The
 * filter criterion for 'ListingDomain' is invalid`) regardless of the key value
 * — the web client only appears to filter because it runs against a mock
 * backend. Partitioning the returned rows avoids the invalid-filter error and
 * costs a single request. Rails with no matching rows are skipped.
 */
export const HomeArtworkRails = () => {
  const data = useSystemQueryLoader<HomeArtworkRailsQuery>(
    graphql`
      query HomeArtworkRailsQuery {
        getPublicArtworkListings(
          input: { subscriptionId: "", page: 1, pageSize: 40 }
        ) {
          results {
            listingDomain
            ...ArtworkRail_listing
          }
        }
      }
    `,
    {}
  )

  const listings = data.getPublicArtworkListings.results

  const rails = [
    { title: "On Artnet", listings },
    {
      title: "Auction lots",
      listings: listings.filter((l) => l.listingDomain === "ARTNET_AUCTION"),
    },
    {
      title: "From galleries",
      listings: listings.filter((l) => l.listingDomain === "GALLERY"),
    },
  ].filter((rail) => rail.listings.length > 0)

  return (
    <Flex>
      {rails.map((rail, index) => (
        <Fragment key={rail.title}>
          {index > 0 && <Spacer y={2} />}
          <ArtworkRail title={rail.title} listings={rail.listings} />
        </Fragment>
      ))}
    </Flex>
  )
}
