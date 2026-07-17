import { makeArticleLinkInterceptor } from "Scenes/News/NewsArticle"

describe("makeArticleLinkInterceptor", () => {
  const currentUrl = "https://news.artnet.com/art-world/current-article-111"

  it("allows the screen's own article to load in place (no push)", () => {
    const onOpenArticle = jest.fn()
    const shouldLoad = makeArticleLinkInterceptor(currentUrl, onOpenArticle)

    expect(shouldLoad({ url: currentUrl })).toBe(true)
    expect(onOpenArticle).not.toHaveBeenCalled()
  })

  it("intercepts a tap on another article: pushes it and blocks in-WebView nav", () => {
    const onOpenArticle = jest.fn()
    const shouldLoad = makeArticleLinkInterceptor(currentUrl, onOpenArticle)
    const otherArticle = "https://news.artnet.com/market/another-story-222"

    expect(shouldLoad({ url: otherArticle })).toBe(false)
    expect(onOpenArticle).toHaveBeenCalledWith(otherArticle)
  })

  it("loads variants of the same article (redirect / query / #anchor) in place", () => {
    const onOpenArticle = jest.fn()
    const shouldLoad = makeArticleLinkInterceptor(currentUrl, onOpenArticle)

    // same article id 111, differing by trailing slash, tracking query, and
    // an in-page anchor — must NOT be treated as a different article.
    expect(shouldLoad({ url: `${currentUrl}/` })).toBe(true)
    expect(shouldLoad({ url: `${currentUrl}?utm_source=x` })).toBe(true)
    expect(shouldLoad({ url: `${currentUrl}#comments` })).toBe(true)
    expect(onOpenArticle).not.toHaveBeenCalled()
  })

  it("lets non-article links (category/author/search) load in place", () => {
    const onOpenArticle = jest.fn()
    const shouldLoad = makeArticleLinkInterceptor(currentUrl, onOpenArticle)

    expect(shouldLoad({ url: "https://news.artnet.com/art-world" })).toBe(true)
    expect(shouldLoad({ url: "https://news.artnet.com/author/jdoe" })).toBe(true)
    expect(onOpenArticle).not.toHaveBeenCalled()
  })
})
