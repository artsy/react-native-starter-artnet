import { fireEvent, screen } from "@testing-library/react-native"
import { graphql } from "react-relay"

import { ArtworkRailTestQuery } from "__generated__/ArtworkRailTestQuery.graphql"
import { ArtworkRail } from "Scenes/Home/ArtworkRail"
import { setupTestWrapper } from "utils/test/setupTestWrapper"

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: mockNavigate }),
}))

jest.mock("store/GlobalStore", () => ({
  GlobalStore: {
    useAppState: (
      selector: (state: {
        config: { environment: { strings: { imagesURL: string } } }
      }) => unknown
    ) =>
      selector({
        config: {
          environment: { strings: { imagesURL: "https://images.artnet-dev.com" } },
        },
      }),
  },
}))

const Wrapper = (props: ArtworkRailTestQuery["response"]) => (
  <ArtworkRail
    title="On Artnet"
    listings={props.getPublicArtworkListings.results}
  />
)

const { renderWithRelay } = setupTestWrapper<ArtworkRailTestQuery>({
  Component: Wrapper,
  query: graphql`
    query ArtworkRailTestQuery @relay_test_operation {
      getPublicArtworkListings(
        input: { subscriptionId: "", page: 1, pageSize: 1 }
      ) {
        results {
          ...ArtworkRail_listing
        }
      }
    }
  `,
})

describe("ArtworkRail", () => {
  beforeEach(() => mockNavigate.mockClear())

  it("opens the Artwork screen with the listing's details on tap", () => {
    renderWithRelay({
      ArtListingSummary: () => ({ saleName: "Evening Sale" }),
      ListingData: () => ({ title: "Marilyn", artworks: [{}] }),
      ListingDataArtworkSummary: () => ({
        mediumRaw: "Screenprint",
        creationYearFrom: 1967,
        creationYearTo: 1967,
      }),
      CreatorSummary: () => ({ name: "Andy Warhol" }),
      ArtMarketInstitution: () => ({ name: "Some Gallery" }),
      Image: () => ({ baseImageUrl: "/img/marilyn.jpg" }),
    })

    fireEvent.press(screen.getByLabelText("View Marilyn"))

    expect(mockNavigate).toHaveBeenCalledWith(
      "Artwork",
      expect.objectContaining({
        title: "Marilyn",
        artistName: "Andy Warhol",
        medium: "Screenprint",
        year: "1967",
        institutionName: "Some Gallery",
        saleName: "Evening Sale",
        baseImageUrl: "/img/marilyn.jpg",
      })
    )
  })
})
