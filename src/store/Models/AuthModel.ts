import CookieManager from "@react-native-cookies/cookies"
import { Action, action, Thunk, thunk } from "easy-peasy"

import { GlobalStoreModel } from "store/Models/GlobalStoreModel"
import { logger } from "system/logger"

interface AuthModelState {
  sessionCookie: string | null
  userID: string | null
  email: string | null
}

const authModelInitialState: AuthModelState = {
  sessionCookie: null,
  userID: null,
  email: null,
}

export interface AuthModel extends AuthModelState {
  setState: Action<this, Partial<AuthModelState>>
  setSession: Action<
    this,
    { sessionCookie: string; userID?: string | null; email?: string | null }
  >
  signOut: Thunk<this, void, {}, GlobalStoreModel>
}

export const AuthModel: AuthModel = {
  ...authModelInitialState,

  setState: action((state, payload) => {
    Object.assign(state, payload)
  }),

  // Flips the nav guard: setting `sessionCookie` moves the app into the
  // signed-in navigation group.
  setSession: action((state, payload) => {
    state.sessionCookie = payload.sessionCookie
    if (payload.userID !== undefined) {
      state.userID = payload.userID
    }
    if (payload.email !== undefined) {
      state.email = payload.email
    }
  }),

  // Resilient sign-out: best-effort cookie clear, then reset auth state. Never
  // throws so callers don't need to guard it.
  signOut: thunk(async (actions) => {
    try {
      await CookieManager.clearAll()
    } catch (error) {
      logger.error("Failed to clear cookies on sign out", error as Error)
    }
    actions.setState(authModelInitialState)
  }),
}
