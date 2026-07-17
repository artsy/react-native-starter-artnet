import { Button, Flex, Text } from "@artsy/palette-mobile"
import { graphql } from "react-relay"

import { HomeQuery } from "__generated__/HomeQuery.graphql"
import { HomeUser } from "Scenes/Home/HomeUser"
import { GlobalStore } from "store/GlobalStore"
import { useSystemQueryLoader } from "system/relay/useSystemQueryLoader"

export const HomeScreen = () => {
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
        onPress={() => {
          GlobalStore.actions.auth.signOut()
        }}
      >
        Log out
      </Button>
    </Flex>
  )
}
