import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable"
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useStoreRehydrated } from "easy-peasy"
import { useEffect } from "react"
import { Platform } from "react-native"

import { ArtworkScreen } from "Scenes/Artwork/Artwork"
import { ArtworkStackParamList } from "Scenes/Artwork/types"
import { DevMenuScreen } from "Scenes/DevMenu/DevMenu"
import { HomeScreen } from "Scenes/Home/Home"
import { LoginScreen } from "Scenes/Login/Login"
import { NewsArticleScreen } from "Scenes/News/NewsArticle"
import { NewsFeedScreen } from "Scenes/News/NewsFeed"
import { NewsStackParamList } from "Scenes/News/types"
import { SettingsScreen } from "Scenes/Settings/Settings"
import { GlobalStore } from "store/GlobalStore"

// Auth guards for the static navigator's conditional groups.
const useIsLoggedIn = () =>
  GlobalStore.useAppState((store) => store.auth.isSignedIn)
const useIsLoggedOut = () => !useIsLoggedIn()

// News tab: a native-stack so tapping an article pushes an article screen, and
// article-to-article links (intercepted in the WebView) push further screens —
// the stack's back button walks the reading history.
const NewsStack = createNativeStackNavigator({
  screens: {
    NewsFeed: {
      screen: NewsFeedScreen,
      options: { title: "News", headerShown: false },
    },
    NewsArticle: {
      screen: NewsArticleScreen,
      options: ({ route }) => ({
        headerShown: true,
        title:
          (route.params as NewsStackParamList["NewsArticle"] | undefined)
            ?.title ?? "Article",
      }),
    },
  },
})

// Native bottom tabs render a real UITabBarController, so on iOS 26 the system
// draws the "Liquid Glass" floating tab bar (and falls back to the classic
// native bar on older OS versions). Native tabs can't render React-component
// icons, so tab icons are native descriptors: SF Symbols on iOS and PNG image
// sources on Android (rasterized from @artsy/icons in src/assets/images/tabs).
const HomeTabs = createNativeBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    // Minimize the Liquid Glass bar as the user scrolls down (iOS 26+; a no-op
    // on older OS versions).
    tabBarMinimizeBehavior: "onScrollDown",
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "Home",
        tabBarIcon: Platform.select({
          ios: { type: "sfSymbol", name: "house" } as const,
          android: {
            type: "image",
            source: require("assets/images/tabs/home.png"),
          } as const,
        }),
      },
    },
    News: {
      screen: NewsStack,
      options: {
        title: "News",
        tabBarIcon: Platform.select({
          ios: { type: "sfSymbol", name: "newspaper" } as const,
          // Reuses the freed "grid" asset as a placeholder — swap for a
          // dedicated news icon (rasterized from @artsy/icons) when available.
          android: {
            type: "image",
            source: require("assets/images/tabs/grid.png"),
          } as const,
        }),
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        title: "Settings",
        tabBarIcon: Platform.select({
          ios: { type: "sfSymbol", name: "gearshape" } as const,
          android: {
            type: "image",
            source: require("assets/images/tabs/settings.png"),
          } as const,
        }),
      },
    },
  },
})

const RootStack = createNativeStackNavigator({
  screenOptions: { headerShown: false, contentStyle: {
    backgroundColor: "#fff"
  } },
  groups: {
    SignedIn: {
      if: useIsLoggedIn,
      screens: {
        Home: HomeTabs,
        // Artwork detail, pushed over the tabs when a Home rail card is tapped.
        Artwork: {
          screen: ArtworkScreen,
          options: ({ route }) => ({
            headerShown: true,
            title:
              (route.params as ArtworkStackParamList["Artwork"] | undefined)
                ?.title ?? "Artwork",
          }),
        },
        // Developer-only screen for feature-flag overrides. The entry point in
        // Settings is gated on `__DEV__`, but the route is always registered so
        // the static param list stays stable.
        DevMenu: {
          screen: DevMenuScreen,
          options: { headerShown: true, title: "Dev Menu" },
        },
      },
    },
    SignedOut: {
      if: useIsLoggedOut,
      screens: {
        Login: LoginScreen,
      },
    },
  },
})

// Register the param list globally so `useNavigation()` is typed everywhere.
// react-navigation's sanctioned pattern requires a global namespace here.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // Must stay an interface (not a type alias) so it merges with react-navigation's
    // RootParamList; an empty-extends interface is the sanctioned pattern here.
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends StaticParamList<typeof RootStack> {}
  }
}

const Navigation = createStaticNavigation(RootStack)

/**
 * Root navigation entry point. Waits for the persisted store to rehydrate so
 * the auth guards resolve to the right group on first render.
 */
export const Main = () => {
  const isRehydrated = useStoreRehydrated()
  const isSignedIn = GlobalStore.useAppState((store) => store.auth.isSignedIn)

  // Refresh the current user (feature-flag targeting context) once we're signed
  // in — both right after login and on a cold start with a persisted session.
  useEffect(() => {
    if (isRehydrated && isSignedIn) {
      GlobalStore.actions.auth.hydrateUser()
    }
  }, [isRehydrated, isSignedIn])

  if (!isRehydrated) {
    return null
  }

  return <Navigation />
}
