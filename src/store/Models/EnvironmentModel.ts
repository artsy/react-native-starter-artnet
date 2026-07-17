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
  // Artnet gateway (GraphQL + SSO). This is the backend the app is moving to.
  gatewayURL: {
    description: "Artnet gateway URL",
    presets: {
      staging: "https://gateway.artnet-dev.com",
      production: "https://gateway.artnet.com",
    },
  },
  webURL: {
    description: "Artnet website URL (used as the SSO returnUrl)",
    presets: {
      staging: "https://www.artnet-dev.com",
      production: "https://www.artnet.com",
    },
  },
  // Artsy backend — retained temporarily while auth is still Gravity-based.
  // Removed once the SSO cookie auth lands.
  gravityURL: {
    description: "Gravity URL",
    presets: {
      staging: "https://stagingapi.artsy.net",
      production: "https://api.artsy.net",
    },
  },
  metaphysicsURL: {
    description: "Metaphysics URL",
    presets: {
      staging: "https://metaphysics-staging.artsy.net/v2",
      production: "https://metaphysics-production.artsy.net/v2",
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

    // Derive the gateway endpoints from the resolved gateway URL.
    return {
      gatewayURL,
      webURL: environmentOptions.webURL.presets[activeEnvironment],
      gravityURL: environmentOptions.gravityURL.presets[activeEnvironment],
      metaphysicsURL:
        environmentOptions.metaphysicsURL.presets[activeEnvironment],
      graphqlURL: gatewayURL + "/graphql",
      loginURL: gatewayURL + "/login",
      logoutURL: gatewayURL + "/logout",
    }
  }),
}
