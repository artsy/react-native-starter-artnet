import { fireEvent, screen } from "@testing-library/react-native"
import { ArtnetAuthWebView } from "components/ArtnetAuthWebView"

import { GlobalStoreProvider } from "store/GlobalStore"
import { renderWithWrappers } from "utils/test/renderWithWrappers"

// Staging presets resolved by the store: gateway.artnet-dev.com (login/logout
// host) and www.artnet-dev.com (the returnUrl / "flow complete" host).
const GATEWAY_URL = "https://gateway.artnet-dev.com/login?returnUrl=x"
const RETURN_URL = "https://www.artnet-dev.com/"

const setup = (
  props: Partial<React.ComponentProps<typeof ArtnetAuthWebView>> = {}
) => {
  const onSuccess = jest.fn()
  const onClose = jest.fn()
  renderWithWrappers(
    <GlobalStoreProvider>
      <ArtnetAuthWebView
        mode="login"
        visible
        onSuccess={onSuccess}
        onClose={onClose}
        {...props}
      />
    </GlobalStoreProvider>
  )
  const navigate = (url: string, loading = false) => {
    screen
      .getByTestId("artnetAuthWebView")
      .props.onNavigationStateChange({ url, loading })
  }
  return { onSuccess, onClose, navigate }
}

describe("ArtnetAuthWebView", () => {
  it("ignores in-progress navigation", () => {
    const { onSuccess, onClose, navigate } = setup()
    navigate(RETURN_URL, /* loading */ true)
    expect(onSuccess).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
  })

  it("does not complete while still on the gateway/login host", () => {
    const { onSuccess, onClose, navigate } = setup()
    navigate(GATEWAY_URL)
    expect(onSuccess).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
  })

  it("completes login when it returns to the main site host", () => {
    const { onSuccess, onClose, navigate } = setup({ mode: "login" })
    navigate(RETURN_URL)
    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("completes logout when it returns to the main site host", () => {
    const { onSuccess, onClose, navigate } = setup({ mode: "logout" })
    navigate(RETURN_URL)
    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("treats a manual Close as dismiss only (no success)", () => {
    const { onSuccess, onClose } = setup()
    fireEvent.press(screen.getByText("Close"))
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onSuccess).not.toHaveBeenCalled()
  })
})
