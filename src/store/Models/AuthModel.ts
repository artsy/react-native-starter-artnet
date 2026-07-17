import { Action, action, Thunk, thunk } from "easy-peasy"
import { fetchQuery, graphql } from "react-relay"

import { AuthModelHydrateUserQuery } from "__generated__/AuthModelHydrateUserQuery.graphql"
import { defaultEnvironment } from "relay/defaultEnvironent"
import { GlobalStoreModel } from "store/Models/GlobalStoreModel"
import { logger } from "system/logger"

interface AuthModelState {
  // Whether the user has completed the Artnet SSO flow. The actual
  // `gatewaySession` cookie lives in the native cookie jar (shared with the
  // login WebView) and is sent automatically on GraphQL requests — we only
  // track the signed-in state here, mirroring how the web client relies on the
  // browser's cookie jar rather than reading the httpOnly cookie itself.
  isSignedIn: boolean
  // Populated from `getCurrentUser` after sign-in (see `hydrateUser`). Used for
  // the feature-flag targeting context; not required for auth (the cookie is).
  userID: string | null
  email: string | null
}

const authModelInitialState: AuthModelState = {
  isSignedIn: false,
  userID: null,
  email: null,
}

export interface AuthModel extends AuthModelState {
  setState: Action<this, Partial<AuthModelState>>
  setSignedIn: Action<this>
  hydrateUser: Thunk<this, void, {}, GlobalStoreModel, Promise<void>>
  signOut: Thunk<this, void, {}, GlobalStoreModel>
}

export const AuthModel: AuthModel = {
  ...authModelInitialState,

  setState: action((state, payload) => {
    Object.assign(state, payload)
  }),

  // Flips the nav guard into the signed-in group after the SSO WebView returns
  // to the Artnet site.
  setSignedIn: action((state) => {
    state.isSignedIn = true
  }),

  // Fetches the signed-in viewer and records their id/email for the feature-flag
  // context. Goes through the Relay network layer, so it reuses the gateway
  // headers + `credentials: "include"` (auth rides on the shared cookie jar) and
  // the cache/error middlewares. Best-effort — a failure just leaves the user
  // fields null.
  hydrateUser: thunk(async (actions) => {
    try {
      const data = await fetchQuery<AuthModelHydrateUserQuery>(
        defaultEnvironment,
        graphql`
          query AuthModelHydrateUserQuery {
            getCurrentUser {
              user {
                id
                email
              }
            }
          }
        `,
        {}
      ).toPromise()
      const user = data?.getCurrentUser?.user

      if (user) {
        actions.setState({
          userID: user.id ?? null,
          email: user.email ?? null,
        })
      }
    } catch (error) {
      logger.error("Failed to hydrate the current user", error as Error)
    }
  }),

  // Local sign-out: drop back to the signed-out group. The gateway session is
  // ended server-side by loading `logoutURL` in the auth WebView (see
  // ArtnetAuthWebView), which also expires the `gatewaySession` cookie.
  signOut: thunk(async (actions) => {
    actions.setState(authModelInitialState)
  }),
}
