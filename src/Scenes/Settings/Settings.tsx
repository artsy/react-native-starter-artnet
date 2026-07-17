import { Button, Flex, Spacer, Text } from "@artsy/palette-mobile"
import { useNavigation } from "@react-navigation/native"
import { ArtnetAuthWebView } from "components/ArtnetAuthWebView"
import { useState } from "react"

import { GlobalStore } from "store/GlobalStore"

export const SettingsScreen = () => {
  const navigation = useNavigation()
  const [loggingOut, setLoggingOut] = useState(false)
  const email = GlobalStore.useAppState((state) => state.auth.email)

  return (
    <Flex flex={1} justifyContent="center" alignItems="center" px={2}>
      <Text variant="lg-display">Settings</Text>
      <Spacer y={2} />

      {!!email && (
        <Text variant="sm" color="mono60" textAlign="center">
          Logged in as: {email}
        </Text>
      )}

      <Spacer y={2} />
      <Button
        onPress={() => setLoggingOut(true)}
        accessibilityRole="button"
        accessibilityLabel="Log out"
        accessibilityHint="Signs out of your Artnet account"
      >
        Log out
      </Button>

      {__DEV__ && (
        <>
          <Spacer y={2} />
          <Button
            variant="outline"
            size="small"
            accessibilityRole="button"
            accessibilityLabel="Open the developer menu"
            onPress={() => navigation.navigate("DevMenu")}
          >
            Dev Menu
          </Button>
        </>
      )}

      {/*
       * Logout runs through the gateway's `/logout` in the WebView so the SSO
       * session ends server-side (and the shared `gatewaySession` cookie
       * expires). Local auth state is cleared only once the flow completes
       * (`onSuccess`); a manual cancel (`onClose`) leaves the user signed in.
       */}
      <ArtnetAuthWebView
        mode="logout"
        visible={loggingOut}
        onSuccess={() => GlobalStore.actions.auth.signOut()}
        onClose={() => setLoggingOut(false)}
      />
    </Flex>
  )
}
