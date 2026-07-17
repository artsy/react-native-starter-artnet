import { Flex, Text } from "@artsy/palette-mobile"
import { graphql, useFragment } from "react-relay"

import { HomeUser_currentUser$key } from "__generated__/HomeUser_currentUser.graphql"

interface HomeUserProps {
  currentUser: HomeUser_currentUser$key
}

const HomeUserFragment = graphql`
  fragment HomeUser_currentUser on User {
    id
    displayName
  }
`

export const HomeUser: React.FC<HomeUserProps> = (props) => {
  const currentUser = useFragment(HomeUserFragment, props.currentUser)

  if (!currentUser) {
    return <Text>Failed to make query</Text>
  }

  return (
    <Flex>
      <Text>{currentUser.displayName}</Text>
    </Flex>
  )
}
