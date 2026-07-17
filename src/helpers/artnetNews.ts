/**
 * Recognizes an Artnet **news article** URL, so the news WebView can intercept
 * article-to-article link taps and open them as new native screens.
 *
 * News lives on the news subdomain (`news.artnet.com` in prod, `<env>-news.
 * artnet-dev.com` on staging). An individual article path ends in `-<digits>`
 * (the article id), e.g. `/art-world/andy-warhol-...-446897`; category/author/
 * search pages (`/art-world`, `/author/...`, `/search/...`) do not — those are
 * left to load in place.
 */
export const isNewsArticleUrl = (url: string): boolean => {
  const match = /^[a-z]+:\/\/([^/?#]+)([^?#]*)/i.exec(url)
  if (!match) {
    return false
  }
  const host = match[1].split(":")[0].toLowerCase()
  const path = match[2] || ""

  // Match the news label at a boundary — start of host, a subdomain dot, or the
  // env-prefix hyphen (`qa1-news.artnet-dev.com`) — so `notnews.artnet.com`
  // isn't treated as a news host.
  const isNewsHost = /(^|[.-])news\.artnet(-dev)?\.com$/.test(host)
  const isArticlePath = /-\d+\/?$/.test(path)

  return isNewsHost && isArticlePath
}
