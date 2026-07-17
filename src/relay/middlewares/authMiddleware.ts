import { Middleware } from "react-relay-network-modern"

import { unsafe__getAuth } from "store/GlobalStore"

// Attaches the Artnet gateway session cookie to outgoing GraphQL requests.
// The gateway authenticates via the `gatewaySession` cookie rather than a
// bearer/access token, so we forward it (when present) on the Cookie header
// and opt into credentialed fetches.
export const authMiddleware = (): Middleware => {
  return (next) => async (req) => {
    const { sessionCookie } = unsafe__getAuth()

    if (sessionCookie) {
      req.fetchOpts.headers["Cookie"] = `gatewaySession=${sessionCookie}`
      req.fetchOpts.credentials = "include"
    }

    return next(req)
  }
}
