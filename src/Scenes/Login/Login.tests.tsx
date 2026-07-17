import { screen } from "@testing-library/react-native"

import { LoginScreen } from "Scenes/Login/Login"
import { GlobalStoreProvider } from "store/GlobalStore"
import { renderWithWrappers } from "utils/test/renderWithWrappers"

describe("LoginScreen", () => {
  it("renders the Artnet login button", () => {
    renderWithWrappers(
      <GlobalStoreProvider>
        <LoginScreen />
      </GlobalStoreProvider>
    )

    expect(screen.getByText("Welcome")).toBeTruthy()
    expect(screen.getByTestId("loginButton")).toBeTruthy()
    expect(screen.getByText("Log in with Artnet")).toBeTruthy()
  })
})
