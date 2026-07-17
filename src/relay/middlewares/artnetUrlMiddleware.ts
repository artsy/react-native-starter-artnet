import { urlMiddleware } from "react-relay-network-modern"

import { getUserAgent } from "helpers/getUserAgent"
import { unsafe__getEnvironment } from "store/GlobalStore"

// Identifies this client to the Artnet gateway. Uses the app slug.
const ARTNET_PRODUCT = "react-native-starter"
// Stable device identifier sent to the gateway. Placeholder for now; can be
// swapped for a persisted per-install id (e.g. react-native-device-info) later.
const ARTNET_DEVICE_ID = "react-native-starter"

export const artnetUrlMiddleware = () => {
  return urlMiddleware({
    url: () => unsafe__getEnvironment().strings.graphqlURL,
    headers: () => {
      const userAgent = getUserAgent()
      return {
        "Content-Type": "application/json",
        "User-Agent": userAgent,
        "x-artnet-product": ARTNET_PRODUCT,
        "x-artnet-device-id": ARTNET_DEVICE_ID,
      }
    },
  })
}
