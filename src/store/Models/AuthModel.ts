import { Action, action, Thunk, thunk } from "easy-peasy"

import { GlobalStoreModel } from "store/Models/GlobalStoreModel"

interface AuthModelState {
  // Whether the user has completed the Artnet SSO flow. The actual
  // `gatewaySession` cookie lives in the native cookie jar (shared with the
  // login WebView) and is sent automatically on GraphQL requests — we only
  // track the signed-in state here, mirroring how the web client relies on the
  // browser's cookie jar rather than reading the httpOnly cookie itself.
  isSignedIn: boolean
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

  // Local sign-out: drop back to the signed-out group. The gateway session is
  // ended server-side by loading `logoutURL` in the auth WebView (see
  // ArtnetAuthWebView), which also expires the `gatewaySession` cookie.
  signOut: thunk(async (actions) => {
    actions.setState(authModelInitialState)
  }),
}
