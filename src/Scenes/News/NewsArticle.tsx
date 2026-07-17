import { Flex, Spinner } from "@artsy/palette-mobile"
import type { StaticScreenProps } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { WebView } from "react-native-webview"

import { newsArticleId } from "helpers/artnetNews"
import { NewsStackParamList } from "Scenes/News/types"

type Props = StaticScreenProps<NewsStackParamList["NewsArticle"]>

/**
 * Decides what the article WebView does with a navigation request, keeping
 * navigation in react-navigation: the screen's own article loads in place, a
 * tap on a DIFFERENT article is intercepted (`onOpenArticle` pushes a new
 * screen, returns `false` to block the in-WebView load), and everything else
 * (category/author/search) loads in place. Extracted as a pure function so the
 * interception logic is testable without mounting the WebView.
 *
 * "Same article" is compared on the article id, not raw URL equality: a
 * canonicalizing redirect (trailing slash, dropped tracking params, http→https)
 * or an in-page `#anchor` yields a URL variant that must still load in place —
 * otherwise it would be misread as a different article, pushing a duplicate
 * screen and cancelling the current load (leaving it stuck on the spinner).
 */
export const makeArticleLinkInterceptor =
  (currentUrl: string, onOpenArticle: (url: string) => void) =>
  (request: { url: string }): boolean => {
    // Fast path: the exact same URL always loads in place.
    if (request.url === currentUrl) {
      return true
    }

    const requestId = newsArticleId(request.url)
    // Not an article (category/author/search, or off-site) → load in place.
    if (requestId === null) {
      return true
    }
    // A variant of THIS article (same id) → load in place.
    if (requestId === newsArticleId(currentUrl)) {
      return true
    }
    // A different article → push a new native screen, block in-WebView nav.
    onOpenArticle(request.url)
    return false
  }

/**
 * Renders a single Artnet news article in a WebView. Navigation stays in
 * react-navigation: links to OTHER articles are intercepted and pushed as new
 * native screens (so the stack's back button walks article history), while
 * non-article links (category/author/search) load in place.
 */
export const NewsArticleScreen = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NewsStackParamList>>()
  const { url, title } = route.params

  return (
    <Flex flex={1} backgroundColor="mono0">
      <WebView
        source={{ uri: url }}
        // Reuse the SSO session cookie from the shared native jar.
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        startInLoadingState
        // Articles reached by tapping a link inside the WebView are pushed with
        // only a URL (the title isn't known at link-tap time), so their header
        // would read "Article". Once the page loads, adopt its document title —
        // but only when we weren't given one from the feed (whose titles are
        // cleaner than the full HTML <title>).
        onNavigationStateChange={(navState) => {
          if (!title && !navState.loading && navState.title) {
            navigation.setOptions({ title: navState.title })
          }
        }}
        renderLoading={() => (
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            justifyContent="center"
            alignItems="center"
          >
            <Spinner />
          </Flex>
        )}
        onShouldStartLoadWithRequest={makeArticleLinkInterceptor(
          url,
          (articleUrl) => navigation.push("NewsArticle", { url: articleUrl })
        )}
      />
    </Flex>
  )
}
