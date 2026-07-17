import { Button, Flex, Spacer, Text } from "@artsy/palette-mobile"
import { ArtnetAuthWebView } from "components/ArtnetAuthWebView"
import { useState } from "react"

import { GlobalStore } from "store/GlobalStore"

export const LoginScreen = () => {
  const [webViewVisible, setWebViewVisible] = useState(false)

  return (
    <Flex flex={1} backgroundColor="mono0" justifyContent="center" px={2}>
      <Text variant="lg-display" textAlign="center">
        Welcome
      </Text>
      <Spacer y={1} />
      <Text variant="sm" color="mono60" textAlign="center">
        Sign in with your Artnet account to continue.
      </Text>

      <Spacer y={4} />

      <Button
        block
        haptic="impactMedium"
        onPress={() => setWebViewVisible(true)}
        testID="loginButton"
        accessibilityRole="button"
        accessibilityLabel="Log in with Artnet"
        accessibilityHint="Opens the Artnet sign-in page"
      >
        Log in with Artnet
      </Button>

      <ArtnetAuthWebView
        mode="login"
        visible={webViewVisible}
        onClose={() => setWebViewVisible(false)}
        onSuccess={({ sessionCookie }) =>
          GlobalStore.actions.auth.setSession({ sessionCookie })
        }
      />
    </Flex>
  )
}
