import { Middleware } from "react-relay-network-modern"

// Artnet authenticates GraphQL requests with the `gatewaySession` cookie set
// during the SSO WebView flow. That cookie lives in the app's shared native
// cookie jar, so we just opt into credentialed fetches and let the platform
// attach it automatically (iOS `sharedCookiesEnabled` + NSHTTPCookieStorage;
// Android's ForwardingCookieHandler) — no bearer token or manual Cookie header.
export const authMiddleware = (): Middleware => {
  return (next) => async (req) => {
    req.fetchOpts.credentials = "include"
    return next(req)
  }
}
