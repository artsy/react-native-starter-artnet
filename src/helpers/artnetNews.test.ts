import { isNewsArticleUrl, newsArticleId } from "helpers/artnetNews"

describe("isNewsArticleUrl", () => {
  it("matches article URLs (news host + trailing -<id>)", () => {
    expect(
      isNewsArticleUrl(
        "https://news.artnet.com/art-world/andy-warhol-threatens-pope-335092"
      )
    ).toBe(true)
    // staging news host
    expect(
      isNewsArticleUrl(
        "https://qa1-news.artnet-dev.com/art-world/some-article-446897"
      )
    ).toBe(true)
    // with query string / trailing slash
    expect(
      isNewsArticleUrl("https://news.artnet.com/market/a-story-123/?utm=x")
    ).toBe(true)
  })

  it("does not match category / author / search pages", () => {
    expect(isNewsArticleUrl("https://news.artnet.com/art-world")).toBe(false)
    expect(isNewsArticleUrl("https://news.artnet.com/author/jdoe")).toBe(false)
    expect(isNewsArticleUrl("https://news.artnet.com/search/warhol")).toBe(
      false
    )
  })

  it("does not match non-news hosts even with a trailing id", () => {
    expect(isNewsArticleUrl("https://www.artnet.com/artists/foo-12345")).toBe(
      false
    )
    // "news" must be at a label boundary, not any trailing substring.
    expect(isNewsArticleUrl("https://notnews.artnet.com/a-story-123")).toBe(
      false
    )
    expect(isNewsArticleUrl("not a url")).toBe(false)
  })
})

describe("newsArticleId", () => {
  it("extracts the trailing numeric id, ignoring slash/query/fragment", () => {
    expect(
      newsArticleId("https://news.artnet.com/art-world/a-story-335092")
    ).toBe("335092")
    expect(
      newsArticleId("https://news.artnet.com/art-world/a-story-335092/")
    ).toBe("335092")
    expect(
      newsArticleId("https://news.artnet.com/art-world/a-story-335092?utm=x")
    ).toBe("335092")
    expect(
      newsArticleId("https://news.artnet.com/art-world/a-story-335092#comments")
    ).toBe("335092")
  })

  it("returns null for non-article and non-news URLs", () => {
    expect(newsArticleId("https://news.artnet.com/art-world")).toBeNull()
    expect(newsArticleId("https://www.artnet.com/artists/foo-12345")).toBeNull()
    expect(newsArticleId("not a url")).toBeNull()
  })
})
