import { Button, Flex, Text } from "@artsy/palette-mobile"
import { ArtnetAuthWebView } from "components/ArtnetAuthWebView"
import { useState } from "react"
import { graphql } from "react-relay"

import { HomeQuery } from "__generated__/HomeQuery.graphql"
import { HomeUser } from "Scenes/Home/HomeUser"
import { GlobalStore } from "store/GlobalStore"
import { useSystemQueryLoader } from "system/relay/useSystemQueryLoader"

export const HomeScreen = () => {
  const [loggingOut, setLoggingOut] = useState(false)

  const data = useSystemQueryLoader<HomeQuery>(
    graphql`
      query HomeQuery {
        currentUser {
          ...HomeUser_currentUser
        }
      }
    `,
    {}
  )

  if (!data?.currentUser) {
    return <Text>Query Failed</Text>
  }

  return (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <HomeUser currentUser={data.currentUser} />
      <Button
        onPress={() => setLoggingOut(true)}
        accessibilityRole="button"
        accessibilityLabel="Log out"
        accessibilityHint="Signs out of your Artnet account"
      >
        Log out
      </Button>

      {/*
       * Logout runs through the gateway's `/logout` in the WebView so the SSO
       * session is ended server-side (and the `gatewaySession` cookie expires in
       * the shared native jar). Clearing local auth state on close then drops the
       * app back to the signed-out group.
       */}
      <ArtnetAuthWebView
        mode="logout"
        visible={loggingOut}
        onClose={() => {
          setLoggingOut(false)
          GlobalStore.actions.auth.signOut()
        }}
      />
    </Flex>
  )
}
