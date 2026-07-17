import {
  Flex,
  Image,
  Separator,
  Spacer,
  Spinner,
  Text,
  Touchable,
} from "@artsy/palette-mobile"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { FlashList } from "@shopify/flash-list"
import { Suspense } from "react"
import { graphql } from "react-relay"

import { NewsFeedCreatorsQuery } from "__generated__/NewsFeedCreatorsQuery.graphql"
import { NewsFeedQuery } from "__generated__/NewsFeedQuery.graphql"
import { NewsStackParamList } from "Scenes/News/types"
import { useSystemQueryLoader } from "system/relay/useSystemQueryLoader"

const THUMB = 72
// How many artists to source news from (the gateway's news query is scoped to
// entities, so we seed it with the artists shown in the Home listings).
const MAX_CREATORS = 20

const EmptyState = ({ message }: { message: string }) => (
  <Flex flex={1} justifyContent="center" alignItems="center" p={4}>
    <Text variant="sm" color="mono60" textAlign="center">
      {message}
    </Text>
  </Flex>
)

const Loading = () => (
  <Flex flex={1} justifyContent="center" alignItems="center">
    <Spinner />
  </Flex>
)

/**
 * The News tab. Both phases below suspend (a listings query, then a scoped news
 * query), so the screen owns a Suspense boundary that shows a spinner until the
 * feed is ready.
 */
export const NewsFeedScreen = () => (
  <Suspense fallback={<Loading />}>
    <NewsFeed />
  </Suspense>
)

/**
 * The Artnet gateway has no global news feed — `getNewsArticles` must be scoped
 * to an entity (artist/gallery/auction house), and an unfiltered call errors.
 * So we seed the feed with the artists (`creator`s) of the current public
 * listings and show news for them. Two phases: derive creator ids, then fetch
 * their news (only when we have at least one, so we never send an empty filter).
 */
const NewsFeed = () => {
  const data = useSystemQueryLoader<NewsFeedCreatorsQuery>(
    graphql`
      query NewsFeedCreatorsQuery {
        getPublicArtworkListings(
          input: { subscriptionId: "", page: 1, pageSize: 40 }
        ) {
          results {
            listingData {
              artworks {
                creator {
                  id
                }
              }
            }
          }
        }
      }
    `,
    {}
  )

  const creatorIds = Array.from(
    new Set(
      data.getPublicArtworkListings.results
        .flatMap((result) => result.listingData.artworks)
        .map((artwork) => artwork.creator?.id)
        .filter((id): id is string => !!id)
        // The news `creator` filter expects entity keys shaped like
        // `Artist_<id>`. A listing's `creator.id` may already be in that form or
        // a bare numeric id, so normalize to the prefixed key either way.
        .map((id) => (id.startsWith("Artist_") ? id : `Artist_${id}`))
    )
  ).slice(0, MAX_CREATORS)

  if (creatorIds.length === 0) {
    return <EmptyState message="No news right now." />
  }

  return <CreatorNewsFeed creatorIds={creatorIds} />
}

const CreatorNewsFeed = ({ creatorIds }: { creatorIds: string[] }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NewsStackParamList>>()

  const data = useSystemQueryLoader<NewsFeedQuery>(
    graphql`
      query NewsFeedQuery($creatorKeys: [String!]!) {
        getNewsArticles(
          input: {
            filters: { creator: { keys: $creatorKeys } }
            page: 1
            pageSize: 30
          }
        ) {
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
    { creatorKeys: creatorIds }
  )

  const articles = data.getNewsArticles.results

  if (articles.length === 0) {
    return <EmptyState message="No news right now." />
  }

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
