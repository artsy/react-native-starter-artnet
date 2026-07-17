import { fireEvent, screen } from "@testing-library/react-native"

import { NewsFeedQuery } from "__generated__/NewsFeedQuery.graphql"
import { NewsFeedScreen } from "Scenes/News/NewsFeed"
import { setupTestWrapper } from "utils/test/setupTestWrapper"

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: mockNavigate }),
}))

const { renderWithRelay } = setupTestWrapper<NewsFeedQuery>({
  Component: NewsFeedScreen,
})

describe("NewsFeedScreen", () => {
  beforeEach(() => mockNavigate.mockClear())

  it("renders articles and navigates to the article on tap", async () => {
    renderWithRelay({
      NewsArticle: () => ({
        title: "Warhol news",
        author: "Jane Doe",
        categoryName: "Art World",
        url: "https://news.artnet.com/art-world/warhol-news-123",
      }),
    })

    // The component suspends until the mock operation resolves, so wait for the
    // re-render before asserting.
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
})
