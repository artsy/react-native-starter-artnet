# Artnet Backend

This app talks to the **Artnet GraphQL gateway** rather than Artsy's
Metaphysics. This page describes the gateway endpoint, how authentication works
via an SSO cookie, and how login/logout flow through the app.

## GraphQL gateway

All GraphQL requests go to the Artnet gateway:

```
{gatewayURL}/graphql
```

- **Staging:** `https://gateway.artnet-dev.com/graphql`
- The gateway base URL is configured per-environment (see the
  `EnvironmentModel` store slice) and the Relay network layer posts operations
  to `{gatewayURL}/graphql`.

The gateway exposes the current viewer through `currentUser`:

```graphql
type User {
  id: ID!
  displayName: String!
  email: String!
}

type Query {
  currentUser: User
}
```

This replaces the old Artsy `me: Me` root field. The Home screen reads
`currentUser` and renders the signed-in user's `displayName` and `email`.

## Authentication — SSO cookie

The gateway authenticates requests using an **SSO session cookie**, not a bearer
token:

- Login is performed through a **WebView** pointed at the Artnet SSO sign-in
  page. When the user completes sign-in, the gateway sets a **`gatewaySession`**
  cookie on the WebView's cookie jar.
- The app extracts the `gatewaySession` cookie and persists it. Subsequent Relay
  requests to `{gatewayURL}/graphql` send this cookie so the gateway resolves
  `currentUser` for the authenticated viewer.

### Login

1. Present the SSO WebView (`{gatewayURL}` sign-in flow).
2. On successful sign-in, read the `gatewaySession` cookie from the WebView.
3. Store the cookie and flip the app into the signed-in navigation group.

### Logout

`GlobalStore.actions.auth.signOut()` clears the stored `gatewaySession` cookie
(and the WebView cookie jar), which drops the app back to the signed-out
navigation group. Without the cookie the gateway returns `currentUser: null`.

## Staging & Cloudflare Access

The staging gateway (`gateway.artnet-dev.com`) sits behind **Cloudflare
Access**. Direct programmatic access — for example, **schema introspection** via
`yarn sync-schema`, or hitting the endpoint from scripts/CI — requires
Cloudflare Access service-token headers:

```
CF-Access-Client-Id: <client-id>
CF-Access-Client-Secret: <client-secret>
```

Requests from the app's WebView authenticate interactively through Cloudflare
Access in the browser, so the service-token headers are only needed for
non-interactive access to staging (schema sync, tooling, CI).
