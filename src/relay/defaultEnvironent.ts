import {
  cacheMiddleware,
  errorMiddleware,
  loggerMiddleware,
  perfMiddleware,
  RelayNetworkLayer,
} from "react-relay-network-modern"
import { Environment, RecordSource, Store } from "relay-runtime"

import { getDataID } from "relay/getDataID"
import { artnetUrlMiddleware } from "relay/middlewares/artnetUrlMiddleware"
import { authMiddleware } from "relay/middlewares/authMiddleware"

const network = new RelayNetworkLayer(
  [
    // Default to size 100 and ttl 900000 (15 minutes)
    cacheMiddleware({
      size: 100, // max 100 requests
      ttl: 900000, // 15 minutes
    }),
    artnetUrlMiddleware(),
    __DEV__ ? loggerMiddleware() : null,
    __DEV__ ? errorMiddleware() : null,
    __DEV__ ? perfMiddleware() : null,
    authMiddleware(),
  ],
  {
    // `noThrow` is currently marked as "experimental" and may be deprecated in the future.
    // See: https://github.com/relay-tools/react-relay-network-modern#advanced-options-2nd-argument-after-middlewares
    noThrow: true,
  }
) // as second arg you may pass advanced options for RRNL

export const defaultEnvironment = new Environment({
  network,
  store: new Store(new RecordSource()),
  // The Artnet gateway reuses ids across types (e.g. an ArtListingSummary and
  // its ListingData), so key records by type + id to avoid record collisions.
  getDataID,
})
