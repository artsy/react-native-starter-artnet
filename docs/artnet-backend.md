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

The gateway exposes the current viewer through `getCurrentUser`:

```graphql
type User {
  id: ID!
  displayName: String!
  email: String!
}

type CurrentUserResult {
  isLoggedIn: Boolean!
  isReauthenticationRequired: Boolean!
  user: User
}

type Query {
  getCurrentUser: CurrentUserResult!
}
```

This replaces the old Artsy `me: Me` root field. The Home screen reads
`getCurrentUser { user { … } }` and renders the signed-in user's `displayName`
and `email`.

## Authentication — SSO cookie

The gateway authenticates requests with an **SSO session cookie** (`gatewaySession`),
not a bearer token — exactly like the web client. There is no credentials API
and no email/password token endpoint, so the login UI is the Identity Server's
**hosted page**, shown in an in-app WebView. Everything else in the app is
native React Native; the WebView is only the sign-in handshake.

The app mirrors how a browser handles this — it lets the **shared native cookie
jar** carry the session rather than reading the httpOnly cookie by hand:

- `ArtnetAuthWebView` opens `{gatewayURL}/login?returnUrl={webURL}`. The gateway
  runs the OpenID Connect authorization-code flow against the Identity Server and,
  on success, sets `gatewaySession` and redirects back to `returnUrl` (the main
  site).
- The WebView uses `sharedCookiesEnabled` (iOS → `NSHTTPCookieStorage`) and
  Android's `ForwardingCookieHandler`, so cookies set during sign-in are shared
  with the app's `fetch`. Relay's `authMiddleware` sets `credentials: "include"`,
  so `gatewaySession` is sent automatically on `{gatewayURL}/graphql` requests —
  the gateway then resolves `getCurrentUser` for the viewer.

### Login

1. Present the SSO WebView (the gateway `/login` flow → hosted IdP page).
2. Detect completion when the flow **redirects back to the main site host**
   (`webURL`).
3. Flip the app into the signed-in group via `GlobalStore.actions.auth.setSignedIn()`.
   The session itself lives in the native cookie jar; the store keeps an
   `isSignedIn` flag plus the viewer's `id`/`email`, which `hydrateUser` fetches
   from `getCurrentUser` (using the shared cookie jar) for the feature-flag
   targeting context. `hydrateUser` runs on sign-in and on a cold start with a
   persisted session.

### Logout

`GlobalStore.actions.auth.signOut()` clears the local `isSignedIn` flag, dropping
the app back to the signed-out group. To also end the **server-side** session
(and expire `gatewaySession`), open `ArtnetAuthWebView` in `logout` mode, which
loads `{gatewayURL}/logout`.

> No native cookie library is used — cookie handling is entirely via the WebView
> + the platform cookie jar. This keeps the native build free of unmaintained
> Gradle dependencies.

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
needs (e.g. `getCurrentUser` on Home). This was verified, not assumed:

- The Relay compiler accepts the Artnet client schema and compiles the app's
  operations/fragments (`yarn relay`), TypeScript type-checks, and the
  Relay-mocked tests pass.
- At runtime Relay simply issues standard GraphQL POST requests to
  `{gatewayURL}/graphql`, which the gateway (a spec-compliant Apollo Federation
  server) serves. `User` exposes a global `id: ID!`, so `getCurrentUser`
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

None of these block login/logout or the Home `getCurrentUser` view. If we later need
refetch or cursor pagination, that requires gateway-side schema additions
(`Node`/connections) or client-side adapters.

> A live network round-trip could not be exercised from the build environment
> (staging is behind Cloudflare Access and off the egress allowlist); the
> verification above is compile-, type-, and test-level plus the schema analysis.
