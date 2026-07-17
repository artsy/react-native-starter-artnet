import { screen } from "@testing-library/react-native"

import { HomeArtworkRailsQuery } from "__generated__/HomeArtworkRailsQuery.graphql"
import { HomeArtworkRails } from "Scenes/Home/HomeArtworkRails"
import { setupTestWrapper } from "utils/test/setupTestWrapper"

// Stub ArtworkRail so this test targets which rails render (and with how many
// listings) without pulling in FlashList/palette rendering. Reports its title
// + listing count as plain text.
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
  it("renders a rail per domain-filtered query", async () => {
    // Each aliased getPublicArtworkListings resolves to two listings.
    renderWithRelay({
      SearchResults: () => ({ results: [{}, {}] }),
    })

    expect(await screen.findByText("On Artnet (2)")).toBeTruthy()
    expect(screen.getByText("Auction lots (2)")).toBeTruthy()
    expect(screen.getByText("From galleries (2)")).toBeTruthy()
  })

  it("skips rails whose query returns no results", async () => {
    renderWithRelay({
      SearchResults: () => ({ results: [] }),
    })

    // All three aliases share the resolver, so all rails are empty and skipped.
    expect(screen.queryByText(/On Artnet/)).toBeNull()
    expect(screen.queryByText(/Auction lots/)).toBeNull()
    expect(screen.queryByText(/From galleries/)).toBeNull()
  })
})
