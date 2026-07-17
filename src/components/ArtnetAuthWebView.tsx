import { Button, Flex, Spacer, Text, useColor } from "@artsy/palette-mobile"
import CookieManager from "@react-native-cookies/cookies"
import { ActivityIndicator, Modal } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { WebView, WebViewNavigation } from "react-native-webview"

import { GlobalStore } from "store/GlobalStore"
import { logger } from "system/logger"

interface ArtnetAuthWebViewProps {
  mode: "login" | "logout"
  visible: boolean
  onClose: () => void
  onSuccess?: (session: { sessionCookie: string }) => void
}

// Extracts the lowercased hostname (without port) from a full URL string.
// Returns null when the string has no recognizable host.
const getHost = (url: string): string | null => {
  const match = /^[a-z]+:\/\/([^/?#]+)/i.exec(url)
  if (!match) {
    return null
  }
  return match[1].split(":")[0].toLowerCase()
}

const isArtnetHost = (host: string): boolean =>
  host.endsWith("artnet.com") || host.endsWith("artnet-dev.com")

/**
 * Drives the Artnet gateway OpenID Connect cookie/SSO flow inside an in-app
 * WebView. The gateway rejects non-`*.artnet(-dev).com` returnUrl values, so we
 * cannot use a custom-scheme deep link — instead we watch navigation for the
 * return to the Artnet site and read the `gatewaySession` cookie from the
 * native cookie jar.
 */
export const ArtnetAuthWebView: React.FC<ArtnetAuthWebViewProps> = ({
  mode,
  visible,
  onClose,
  onSuccess,
}) => {
  const color = useColor()
  const insets = useSafeAreaInsets()
  const { loginURL, logoutURL, webURL, gatewayURL } = GlobalStore.useAppState(
    (state) => state.config.environment.strings
  )

  const baseURL = mode === "login" ? loginURL : logoutURL
  const sourceURL = `${baseURL}?returnUrl=${encodeURIComponent(webURL)}`

  const handleNavigationStateChange = async (navState: WebViewNavigation) => {
    const host = getHost(navState.url)

    // Only act once the flow has returned to the Artnet site after SSO.
    if (!host || !isArtnetHost(host)) {
      return
    }

    // On logout there is nothing to read — landing back on the site means the
    // session has ended, so simply dismiss.
    if (mode === "logout") {
      onClose()
      return
    }

    try {
      const cookies = await CookieManager.get(gatewayURL, true)
      // The gateway sets an encrypted httpOnly cookie named `gatewaySession`.
      const sessionCookie = cookies.gatewaySession?.value

      if (sessionCookie) {
        onSuccess?.({ sessionCookie })
        onClose()
      }
    } catch (error) {
      logger.error("Failed to read the Artnet session cookie", error as Error)
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
            source={{ uri: sourceURL }}
            onNavigationStateChange={handleNavigationStateChange}
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
