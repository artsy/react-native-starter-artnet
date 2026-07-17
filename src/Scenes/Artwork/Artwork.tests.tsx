import { screen } from "@testing-library/react-native"
import type { ComponentProps } from "react"

import { ArtworkScreen } from "Scenes/Artwork/Artwork"
import { renderWithWrappers } from "utils/test/renderWithWrappers"

jest.mock("store/GlobalStore", () => ({
  GlobalStore: {
    useAppState: (
      selector: (state: {
        config: { environment: { strings: { imagesURL: string } } }
      }) => unknown
    ) =>
      selector({
        config: {
          environment: { strings: { imagesURL: "https://images.artnet-dev.com" } },
        },
      }),
  },
}))

const route = {
  key: "artwork-1",
  name: "Artwork",
  params: {
    title: "Marilyn",
    artistName: "Andy Warhol",
    medium: "Screenprint",
    year: "1967",
    institutionName: "Some Gallery",
    saleName: "Post-War Sale",
    baseImageUrl: "/img/marilyn.jpg",
  },
} as ComponentProps<typeof ArtworkScreen>["route"]

describe("ArtworkScreen", () => {
  it("renders the artwork's basic details from the route params", () => {
    renderWithWrappers(<ArtworkScreen route={route} />)

    expect(screen.getByText("Marilyn")).toBeTruthy()
    expect(screen.getByText("Andy Warhol")).toBeTruthy()
    expect(screen.getByText("Screenprint")).toBeTruthy()
    expect(screen.getByText("1967")).toBeTruthy()
    expect(screen.getByText("Some Gallery")).toBeTruthy()
    expect(screen.getByText("Post-War Sale")).toBeTruthy()
  })
})
