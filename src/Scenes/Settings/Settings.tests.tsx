import { fireEvent, screen } from "@testing-library/react-native"

import { SettingsScreen } from "Scenes/Settings/Settings"
import { renderWithWrappers } from "utils/test/renderWithWrappers"

const mockNavigate = jest.fn()
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: mockNavigate }),
}))

const mockSignOut = jest.fn()
jest.mock("store/GlobalStore", () => ({
  GlobalStore: {
    useAppState: (selector: (state: { auth: { email: string } }) => unknown) =>
      selector({ auth: { email: "andy@example.com" } }),
    // Referenced lazily so the hoisted jest.mock factory doesn't capture
    // `mockSignOut` before it's initialized.
    actions: { auth: { signOut: (...args: unknown[]) => mockSignOut(...args) } },
  },
}))

// Stub the auth WebView so the test targets Settings' wiring rather than the
// modal/WebView internals: it renders only when `visible`, and tapping it
// invokes `onSuccess` (i.e. the logout flow completed).
jest.mock("components/ArtnetAuthWebView", () => ({
  ArtnetAuthWebView: ({
    visible,
    onSuccess,
  }: {
    visible: boolean
    onSuccess: () => void
  }) => {
    const { Text } = require("react-native")
    return visible ? <Text onPress={onSuccess}>AUTH_WEBVIEW</Text> : null
  },
}))

describe("SettingsScreen", () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    mockSignOut.mockClear()
  })

  it("shows the logged-in email", () => {
    renderWithWrappers(<SettingsScreen />)
    expect(screen.getByText("Logged in as: andy@example.com")).toBeTruthy()
  })

  it("opens the logout flow and signs out once it completes", () => {
    renderWithWrappers(<SettingsScreen />)

    // The auth WebView isn't shown until Log out is tapped.
    expect(screen.queryByText("AUTH_WEBVIEW")).toBeNull()

    fireEvent.press(screen.getByText("Log out"))
    expect(screen.getByText("AUTH_WEBVIEW")).toBeTruthy()

    // Completing the flow signs the user out.
    fireEvent.press(screen.getByText("AUTH_WEBVIEW"))
    expect(mockSignOut).toHaveBeenCalled()
  })
})
