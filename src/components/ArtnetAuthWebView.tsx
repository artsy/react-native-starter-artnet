import { Button, Flex, Spacer, Text, useColor } from "@artsy/palette-mobile"
import { ActivityIndicator, Modal } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { WebView, WebViewNavigation } from "react-native-webview"

import { GlobalStore } from "store/GlobalStore"

interface ArtnetAuthWebViewProps {
  mode: "login" | "logout"
  visible: boolean
  // Called when the modal should hide — including a manual "Close" tap (cancel).
  // Treat this as "dismiss", NOT as "the flow completed".
  onClose: () => void
  // Called only when the flow actually completes (the WebView redirected back to
  // the main site) — for both login and logout. The gateway session is carried
  // by the shared native cookie jar, so no cookie value is passed.
  onSuccess?: () => void
}

// Extracts the lowercased hostname (without port) from a full URL string.
const getHost = (url: string): string | null => {
  const match = /^[a-z]+:\/\/([^/?#]+)/i.exec(url)
  if (!match) {
    return null
  }
  return match[1].split(":")[0].toLowerCase()
}

/**
 * Drives the Artnet gateway OpenID Connect cookie/SSO flow inside an in-app
 * WebView, matching how the web client authenticates.
 *
 * The gateway's `/login` is a browser redirect flow to the hosted Identity
 * Server login page; on success it redirects back to `returnUrl` (the main
 * site) and sets the httpOnly `gatewaySession` cookie. We:
 *   - detect completion by the redirect landing back on the main site host, and
 *   - rely on the SHARED native cookie jar (`sharedCookiesEnabled` on iOS;
 *     Android's ForwardingCookieHandler) so `gatewaySession` is sent
 *     automatically on subsequent Relay/GraphQL requests — no need to read the
 *     httpOnly cookie by hand.
 */
export const ArtnetAuthWebView: React.FC<ArtnetAuthWebViewProps> = ({
  mode,
  visible,
  onClose,
  onSuccess,
}) => {
  const color = useColor()
  const insets = useSafeAreaInsets()
  const { loginURL, logoutURL, webURL } = GlobalStore.useAppState(
    (state) => state.config.environment.strings
  )

  const baseURL = mode === "login" ? loginURL : logoutURL
  const sourceURL = `${baseURL}?returnUrl=${encodeURIComponent(webURL)}`
  // The gateway redirects back to `returnUrl` (the main site) once the SSO flow
  // finishes; landing on that host is our "done" signal for both login/logout.
  const returnHost = getHost(webURL)

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.loading) {
      return
    }

    const host = getHost(navState.url)
    if (host && returnHost && host === returnHost) {
      // Landing back on the main site means the flow finished server-side —
      // login: the session cookie is now in the shared native jar; logout: the
      // gateway has ended the session. Signal completion (for both modes) and
      // dismiss. A manual "Close" tap calls only `onClose`, so an interrupted
      // flow never looks like a completed one.
      onSuccess?.()
      onClose()
    }
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <Flex flex={1} backgroundColor="mono0" style={{ paddingTop: insets.top }}>
        <Flex px={2} py={1} alignItems="flex-end">
          <Button
            size="small"
            variant="outline"
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close login"
            accessibilityHint="Dismisses the Artnet sign-in screen"
          >
            Close
          </Button>
        </Flex>

        <Flex flex={1}>
          <WebView
            testID="artnetAuthWebView"
            source={{ uri: sourceURL }}
            onNavigationStateChange={handleNavigationStateChange}
            // Share cookies with the app's native cookie jar so the gateway
            // session set here is sent on later GraphQL requests.
            sharedCookiesEnabled
            thirdPartyCookiesEnabled
            startInLoadingState
            renderLoading={() => (
              <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                backgroundColor="mono0"
              >
                <ActivityIndicator color={color("mono100")} />
                <Spacer y={1} />
                <Text variant="xs" color="mono60">
                  Loading…
                </Text>
              </Flex>
            )}
          />
        </Flex>
      </Flex>
    </Modal>
  )
}
