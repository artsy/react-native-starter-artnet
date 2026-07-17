import { fireEvent, screen, waitFor } from "@testing-library/react-native"

import { NewsFeedCreatorsQuery } from "__generated__/NewsFeedCreatorsQuery.graphql"
import { NewsFeedScreen } from "Scenes/News/NewsFeed"
import { setupTestWrapper } from "utils/test/setupTestWrapper"

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: mockNavigate }),
}))

const { renderWithRelay } = setupTestWrapper<NewsFeedCreatorsQuery>({
  Component: NewsFeedScreen,
})

describe("NewsFeedScreen", () => {
  beforeEach(() => mockNavigate.mockClear())

  it("derives creators from listings, shows their news, and navigates on tap", async () => {
    // Phase 1: listings resolve with a creator id, so the feed queries news.
    // Resolve each level explicitly (relay-test-utils applies mock resolvers
    // per type) so the derived creator id is deterministic.
    const { env, mockResolveLastOperation } = renderWithRelay({
      SearchResults: () => ({ results: [{}] }),
      ListingData: () => ({ artworks: [{}] }),
      // A bare-numeric creator id — the feed should normalize it to the
      // `Artist_<id>` key shape the news filter expects.
      CreatorSummary: () => ({ id: "3830" }),
    })

    // The news query is issued on the re-render after phase 1 resolves, so wait
    // for it to become pending before resolving it.
    await waitFor(() => expect(env.mock.getAllOperations()).toHaveLength(1))

    // The scoped query is sent with the normalized creator key.
    expect(
      env.mock.getMostRecentOperation().request.variables.creatorKeys
    ).toEqual(["Artist_3830"])

    // Phase 2: the scoped getNewsArticles query resolves with an article.
    mockResolveLastOperation({
      NewsArticle: () => ({
        title: "Warhol news",
        author: "Jane Doe",
        categoryName: "Art World",
        url: "https://news.artnet.com/art-world/warhol-news-123",
      }),
    })

    expect(await screen.findByText("Warhol news")).toBeTruthy()
    expect(screen.getByText("Art World")).toBeTruthy()
    expect(screen.getByText("by Jane Doe")).toBeTruthy()

    fireEvent.press(screen.getByText("Warhol news"))
    expect(mockNavigate).toHaveBeenCalledWith(
      "NewsArticle",
      expect.objectContaining({
        url: "https://news.artnet.com/art-world/warhol-news-123",
        title: "Warhol news",
      })
    )
  })

  it("shows an empty state when the listings have no creators", async () => {
    // No listings → no creator ids → the news query is never sent.
    renderWithRelay({
      SearchResults: () => ({ results: [] }),
    })

    expect(await screen.findByText("No news right now.")).toBeTruthy()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
