// Param list for the News native-stack (see `NewsStack` in Navigation.tsx).
// Shared so the feed and article screens get typed `navigate`/`push`.
export type NewsStackParamList = {
  NewsFeed: undefined
  NewsArticle: { url: string; title?: string }
}
