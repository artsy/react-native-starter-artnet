import { screen } from "@testing-library/react-native"

import { HomeArtworkRailsQuery } from "__generated__/HomeArtworkRailsQuery.graphql"
import { HomeArtworkRails } from "Scenes/Home/HomeArtworkRails"
import { setupTestWrapper } from "utils/test/setupTestWrapper"

// Stub ArtworkRail so this test targets the partitioning logic (which rails
// render, and with how many listings) without pulling in FlashList/palette
// rendering. Reports its title + listing count as plain text.
jest.mock("Scenes/Home/ArtworkRail", () => ({
  ArtworkRail: ({
    title,
    listings,
  }: {
    title: string
    listings: readonly unknown[]
  }) => {
    const { Text } = require("react-native")
    return <Text>{`${title} (${listings.length})`}</Text>
  },
}))

const { renderWithRelay } = setupTestWrapper<HomeArtworkRailsQuery>({
  Component: HomeArtworkRails,
})

describe("HomeArtworkRails", () => {
  it("splits a mixed-domain response into On Artnet + domain rails", async () => {
    renderWithRelay({
      SearchResults: () => ({
        results: [
          { listingDomain: "ARTNET_AUCTION" },
          { listingDomain: "GALLERY" },
          { listingDomain: "GALLERY" },
          { listingDomain: "PDB_TEASER" },
        ],
      }),
    })

    // "On Artnet" is the full set; the domain rails are its subsets.
    expect(await screen.findByText("On Artnet (4)")).toBeTruthy()
    expect(screen.getByText("Auction lots (1)")).toBeTruthy()
    expect(screen.getByText("From galleries (2)")).toBeTruthy()
  })

  it("caps each rail at RAIL_SIZE (10) items", async () => {
    renderWithRelay({
      SearchResults: () => ({
        results: Array.from({ length: 12 }, () => ({
          listingDomain: "GALLERY",
        })),
      }),
    })

    // 12 gallery listings fetched, but each rail is capped at 10.
    expect(await screen.findByText("On Artnet (10)")).toBeTruthy()
    expect(screen.getByText("From galleries (10)")).toBeTruthy()
  })

  it("skips a rail whose domain has no listings", async () => {
    renderWithRelay({
      SearchResults: () => ({
        results: [
          { listingDomain: "GALLERY" },
          { listingDomain: "PDB_TEASER" },
        ],
      }),
    })

    expect(await screen.findByText("On Artnet (2)")).toBeTruthy()
    expect(screen.getByText("From galleries (1)")).toBeTruthy()
    // No auction listings → the "Auction lots" rail is not rendered.
    expect(screen.queryByText(/Auction lots/)).toBeNull()
  })
})
