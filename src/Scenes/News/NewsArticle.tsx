import { Flex, Spinner } from "@artsy/palette-mobile"
import type { StaticScreenProps } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { WebView } from "react-native-webview"

import { isNewsArticleUrl } from "helpers/artnetNews"
import { NewsStackParamList } from "Scenes/News/types"

type Props = StaticScreenProps<NewsStackParamList["NewsArticle"]>

/**
 * Decides what the article WebView does with a navigation request, keeping
 * navigation in react-navigation: the screen's own article loads in place, a
 * tap on ANOTHER article is intercepted (`onOpenArticle` pushes a new screen,
 * returns `false` to block the in-WebView load), and everything else
 * (category/author/search) loads in place. Extracted as a pure function so the
 * interception logic is testable without mounting the WebView.
 */
export const makeArticleLinkInterceptor =
  (currentUrl: string, onOpenArticle: (url: string) => void) =>
  (request: { url: string }): boolean => {
    // Always allow this screen's own article to load.
    if (request.url === currentUrl) {
      return true
    }
    // Intercept taps on other articles → push a new native screen.
    if (isNewsArticleUrl(request.url)) {
      onOpenArticle(request.url)
      return false
    }
    // Category/author/search and other links load in place.
    return true
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
  const { url } = route.params

  return (
    <Flex flex={1} backgroundColor="mono0">
      <WebView
        source={{ uri: url }}
        // Reuse the SSO session cookie from the shared native jar.
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        startInLoadingState
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
