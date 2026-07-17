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

## Relay compatibility

Relay works against the Artnet gateway for the query/fragment use cases this app
needs (e.g. `currentUser` on Home). This was verified, not assumed:

- The Relay compiler accepts the Artnet client schema and compiles the app's
  operations/fragments (`yarn relay`), TypeScript type-checks, and the
  Relay-mocked tests pass.
- At runtime Relay simply issues standard GraphQL POST requests to
  `{gatewayURL}/graphql`, which the gateway (a spec-compliant Apollo Federation
  server) serves. `User` exposes a global `id: ID!`, so `currentUser`
  normalizes cleanly into the Relay store.

**Known limitations** — the gateway schema does **not** currently follow two
Relay conventions, so Relay's advanced features are not available out of the box:

- **No `Node` interface / `node(id: ID!)` root field.** Relay's
  `@refetchable`/`useRefetchableFragment` and imperative id-based refetch depend
  on this, so they won't work until the gateway adds it.
- **No Relay Connection spec.** List fields (e.g. `searchLots`) return
  `{ results, totalCount }` rather than `edges`/`pageInfo` cursors, so
  `usePaginationFragment` / `@connection` cannot be used; pagination must be
  handled manually (offset/limit) or the gateway must expose connections.
- Types without a global `id` are not normalized/deduplicated in the store
  (they still fetch fine).

None of these block login/logout or the Home `currentUser` view. If we later need
refetch or cursor pagination, that requires gateway-side schema additions
(`Node`/connections) or client-side adapters.

> A live network round-trip could not be exercised from the build environment
> (staging is behind Cloudflare Access and off the egress allowlist); the
> verification above is compile-, type-, and test-level plus the schema analysis.
