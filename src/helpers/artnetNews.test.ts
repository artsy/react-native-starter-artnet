import { newsArticleId } from "helpers/artnetNews"

describe("newsArticleId", () => {
  it("extracts the trailing numeric id (news host + trailing -<id>)", () => {
    expect(
      newsArticleId(
        "https://news.artnet.com/art-world/andy-warhol-threatens-pope-335092"
      )
    ).toBe("335092")
    // staging news host
    expect(
      newsArticleId("https://qa1-news.artnet-dev.com/art-world/some-446897")
    ).toBe("446897")
  })

  it("ignores trailing slash, query string, and #anchor", () => {
    expect(
      newsArticleId("https://news.artnet.com/art-world/a-story-335092/")
    ).toBe("335092")
    expect(
      newsArticleId("https://news.artnet.com/market/a-story-335092?utm=x")
    ).toBe("335092")
    expect(
      newsArticleId("https://news.artnet.com/art-world/a-story-335092#comments")
    ).toBe("335092")
  })

  it("returns null for category / author / search pages", () => {
    expect(newsArticleId("https://news.artnet.com/art-world")).toBeNull()
    expect(newsArticleId("https://news.artnet.com/author/jdoe")).toBeNull()
    expect(newsArticleId("https://news.artnet.com/search/warhol")).toBeNull()
  })

  it("returns null for non-news hosts even with a trailing id", () => {
    expect(newsArticleId("https://www.artnet.com/artists/foo-12345")).toBeNull()
    // "news" must be at a label boundary, not any trailing substring.
    expect(newsArticleId("https://notnews.artnet.com/a-story-123")).toBeNull()
    expect(newsArticleId("not a url")).toBeNull()
  })
})
