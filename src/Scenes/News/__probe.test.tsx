import { NewsFeedCreatorsQuery } from "__generated__/NewsFeedCreatorsQuery.graphql"
import { NewsFeedScreen } from "Scenes/News/NewsFeed"
import { setupTestWrapper } from "utils/test/setupTestWrapper"

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: jest.fn() }),
}))

const { renderWithRelay } = setupTestWrapper<NewsFeedCreatorsQuery>({ Component: NewsFeedScreen })

it("probe", () => {
  const { env } = renderWithRelay({
    SearchResults: () => ({ results: [{}] }),
    ListingData: () => ({ artworks: [{}] }),
    CreatorSummary: () => ({ id: "artist-1" }),
  })
  const ops = env.mock.getAllOperations()
  // eslint-disable-next-line no-console
  console.log("PENDING_OPS=", ops.length, ops.map((o) => o.request.node.params.name))
})
