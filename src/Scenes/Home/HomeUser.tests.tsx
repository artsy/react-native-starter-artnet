import { screen } from "@testing-library/react-native"
import { graphql } from "react-relay"

import { HomeUserTestQuery } from "__generated__/HomeUserTestQuery.graphql"
import { HomeUser } from "Scenes/Home/HomeUser"
import { setupTestWrapper } from "utils/test/setupTestWrapper"

// The viewer is nested under `getCurrentUser.user`; extract it the same way
// HomeScreen does and hand the User fragment ref to HomeUser.
const HomeUserTestWrapper = (props: HomeUserTestQuery["response"]) => {
  const user = props.getCurrentUser?.user
  return user ? <HomeUser currentUser={user} /> : null
}

const { renderWithRelay } = setupTestWrapper<HomeUserTestQuery>({
  Component: HomeUserTestWrapper,
  query: graphql`
    query HomeUserTestQuery @relay_test_operation {
      getCurrentUser {
        user {
          ...HomeUser_currentUser
        }
      }
    }
  `,
})

describe("HomeUser", () => {
  it("renders the user's displayName (and not their email)", () => {
    renderWithRelay({
      User: () => ({
        displayName: "Andy Warhol",
        email: "andy@example.com",
      }),
    })

    expect(screen.getByText("Andy Warhol")).toBeTruthy()
    // The email is intentionally not shown on Home.
    expect(screen.queryByText("andy@example.com")).toBeNull()
  })
})
