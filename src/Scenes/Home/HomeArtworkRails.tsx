import { Flex, Spacer } from "@artsy/palette-mobile"
import { Fragment } from "react"
import { graphql } from "react-relay"

import { HomeArtworkRailsQuery } from "__generated__/HomeArtworkRailsQuery.graphql"
import { ArtworkRail } from "Scenes/Home/ArtworkRail"
import { useSystemQueryLoader } from "system/relay/useSystemQueryLoader"

/**
 * A few read-only artwork rails for the Home screen — one public-listings query
 * per rail (`getPublicArtworkListings`, no auth/subscription needed;
 * `subscriptionId` is intentionally empty, mirroring the web client).
 *
 * The gateway REQUIRES a `listingDomain` filter — an unfiltered call fails with
 * `INVALID_ARGUMENT: The filter criterion for 'ListingDomain' is invalid`. The
 * keys are the gateway's PascalCase domain values (`ArtnetAuction`, `Gallery`,
 * `PdbTeaser`), not the client schema's SCREAMING_SNAKE enum names. "On Artnet"
 * spans all public domains; the other rails narrow to one each. Rails with no
 * results are skipped.
 */
export const HomeArtworkRails = () => {
  const data = useSystemQueryLoader<HomeArtworkRailsQuery>(
    graphql`
      query HomeArtworkRailsQuery {
        marketplace: getPublicArtworkListings(
          input: {
            subscriptionId: ""
            page: 1
            pageSize: 10
            filters: {
              listingDomain: { keys: ["PdbTeaser", "Gallery", "ArtnetAuction"] }
            }
          }
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
            filters: { listingDomain: { keys: ["ArtnetAuction"] } }
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
            filters: { listingDomain: { keys: ["Gallery"] } }
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

  const rails = [
    { title: "On Artnet", listings: data.marketplace.results },
    { title: "Auction lots", listings: data.auctions.results },
    { title: "From galleries", listings: data.galleries.results },
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
