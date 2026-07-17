import { Computed,computed } from "easy-peasy"

type Environment = "staging" | "production"

interface EnvironmentOptionDescriptor {
  readonly description: string
  readonly presets: { readonly [k in Environment]: string }
}

// helper to get good typings and intellisense
function defineEnvironmentOptions<EnvOptionName extends string>(options: {
  readonly [k in EnvOptionName]: EnvironmentOptionDescriptor
}) {
  return options
}

export const environmentOptions = defineEnvironmentOptions({
  gatewayURL: {
    description: "Gateway URL",
    presets: {
      staging: "https://gateway.artnet-dev.com",
      production: "https://gateway.artnet.com",
    },
  },
  webURL: {
    description: "Web URL",
    presets: {
      staging: "https://www.artnet-dev.com",
      production: "https://www.artnet.com",
    },
  },
})

export type EnvironmentKey = keyof typeof environmentOptions

// Keys derived from the base environment options (e.g. gateway endpoints).
type DerivedEnvironmentKey = "graphqlURL" | "loginURL" | "logoutURL"

export type EnvironmentStrings = { [k in EnvironmentKey]: string } & {
  [k in DerivedEnvironmentKey]: string
}

interface EnvironmentModelState {
  activeEnvironment: Environment
}

export interface EnvironmentModel extends EnvironmentModelState {
  strings: Computed<EnvironmentModel, EnvironmentStrings>
}

export const EnvironmentModel: EnvironmentModel = {
  // TODO:
  // CRITICAL!
  // Detect if this is a test build or a production build
  // WE CAN NOT GO LIVE WITH THIS
  // See https://github.com/artsy/eigen/blob/2c4797a6f6395fd2a054570de0f70c37996e4533/src/lib/store/config/EnvironmentModel.tsx#L80
  // Reach out to #practice-mobile for more information
  activeEnvironment: "staging",
  strings: computed(({ activeEnvironment }) => {
    const gatewayURL = environmentOptions.gatewayURL.presets[activeEnvironment]
    const webURL = environmentOptions.webURL.presets[activeEnvironment]

    // Derive the gateway endpoints from the resolved gateway URL.
    return {
      gatewayURL,
      webURL,
      graphqlURL: gatewayURL + "/graphql",
      loginURL: gatewayURL + "/login",
      logoutURL: gatewayURL + "/logout",
    }
  }),
}
