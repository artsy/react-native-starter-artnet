import { Flex, Spacer, Spinner, Text } from "@artsy/palette-mobile"
import { ArtnetLogo } from "components/ArtnetLogo"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ScrollView } from "react-native"
import { graphql } from "react-relay"

import { HomeQuery } from "__generated__/HomeQuery.graphql"
import { HomeArtworkRails } from "Scenes/Home/HomeArtworkRails"
import { HomeUser } from "Scenes/Home/HomeUser"
import { logger } from "system/logger"
import { useSystemQueryLoader } from "system/relay/useSystemQueryLoader"

export const HomeScreen = () => {
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
      <Flex px={2}>
        <ArtnetLogo />
        <Spacer y={1} />
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
    </ScrollView>
  )
}
