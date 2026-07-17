import { Button, Flex, Spacer, Spinner, Text } from "@artsy/palette-mobile"
import { ArtnetAuthWebView } from "components/ArtnetAuthWebView"
import { Suspense,useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ScrollView } from "react-native"
import { graphql } from "react-relay"

import { HomeQuery } from "__generated__/HomeQuery.graphql"
import { HomeArtworkRails } from "Scenes/Home/HomeArtworkRails"
import { HomeUser } from "Scenes/Home/HomeUser"
import { GlobalStore } from "store/GlobalStore"
import { logger } from "system/logger"
import { useSystemQueryLoader } from "system/relay/useSystemQueryLoader"

export const HomeScreen = () => {
  const [loggingOut, setLoggingOut] = useState(false)

  const data = useSystemQueryLoader<HomeQuery>(
    graphql`
      query HomeQuery {
        getCurrentUser {
          user {
            ...HomeUser_currentUser
          }
        }
      }
    `,
    {}
  )

  const user = data?.getCurrentUser?.user
  if (!user) {
    return <Text>Query Failed</Text>
  }

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
      <Flex px={2} alignItems="center">
        <HomeUser currentUser={user} />
      </Flex>

      <Spacer y={4} />

      {/*
       * Rails are isolated behind their own Suspense + error boundary so a
       * failure loading the (optional) marketplace content never takes down the
       * signed-in greeting above.
       */}
      <ErrorBoundary
        fallback={<></>}
        onError={(error) =>
          logger.error("Failed to load Home artwork rails", error)
        }
      >
        <Suspense
          fallback={
            <Flex height={220} justifyContent="center" alignItems="center">
              <Spinner />
            </Flex>
          }
        >
          <HomeArtworkRails />
        </Suspense>
      </ErrorBoundary>

      <Spacer y={4} />

      <Flex px={2} alignItems="center">
        <Button
          onPress={() => setLoggingOut(true)}
          accessibilityRole="button"
          accessibilityLabel="Log out"
          accessibilityHint="Signs out of your Artnet account"
        >
          Log out
        </Button>
      </Flex>

      {/*
       * Logout runs through the gateway's `/logout` in the WebView so the SSO
       * session is ended server-side (and the `gatewaySession` cookie expires in
       * the shared native jar). Only clear local auth state once the flow
       * actually completes (`onSuccess`); a manual cancel (`onClose`) just hides
       * the modal and leaves the user signed in.
       */}
      <ArtnetAuthWebView
        mode="logout"
        visible={loggingOut}
        onSuccess={() => GlobalStore.actions.auth.signOut()}
        onClose={() => setLoggingOut(false)}
      />
    </ScrollView>
  )
}
