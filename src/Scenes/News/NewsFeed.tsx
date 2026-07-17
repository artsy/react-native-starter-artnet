import {
  Flex,
  Image,
  Separator,
  Spacer,
  Text,
  Touchable,
} from "@artsy/palette-mobile"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { FlashList } from "@shopify/flash-list"
import { graphql } from "react-relay"

import { NewsFeedQuery } from "__generated__/NewsFeedQuery.graphql"
import { NewsStackParamList } from "Scenes/News/types"
import { useSystemQueryLoader } from "system/relay/useSystemQueryLoader"

const THUMB = 72

export const NewsFeedScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NewsStackParamList>>()

  const data = useSystemQueryLoader<NewsFeedQuery>(
    graphql`
      query NewsFeedQuery {
        getNewsArticles(input: { page: 1, pageSize: 30 }) {
          results {
            id
            title
            author
            categoryName
            url
            featuredImage {
              url
            }
          }
        }
      }
    `,
    {}
  )

  const articles = data.getNewsArticles.results

  return (
    <Flex flex={1} backgroundColor="mono0">
      <FlashList
        data={articles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => (
          <>
            <Spacer y={1} />
            <Separator />
            <Spacer y={1} />
          </>
        )}
        renderItem={({ item }) => {
          const thumbURL = item.featuredImage.find((i) => !!i?.url)?.url
          return (
            <Touchable
              accessibilityRole="button"
              accessibilityLabel={`Read: ${item.title}`}
              onPress={() =>
                navigation.navigate("NewsArticle", {
                  url: item.url,
                  title: item.title,
                })
              }
            >
              <Flex flexDirection="row" alignItems="center">
                {!!thumbURL && (
                  <>
                    <Image
                      src={thumbURL}
                      width={THUMB}
                      height={THUMB}
                      performResize={false}
                    />
                    <Spacer x={1} />
                  </>
                )}
                <Flex flex={1}>
                  <Text variant="xs" color="mono60">
                    {item.categoryName}
                  </Text>
                  <Text variant="sm" numberOfLines={3}>
                    {item.title}
                  </Text>
                  {!!item.author && (
                    <Text variant="xs" color="mono60">
                      by {item.author}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Touchable>
          )
        }}
      />
    </Flex>
  )
}
