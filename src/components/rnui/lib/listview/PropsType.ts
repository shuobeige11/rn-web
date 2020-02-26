interface Props{
  onLoadMore?: () => void
  onRetryLoading?: () => void,
  data?: any[],
  tabs?: number | any,
  state?: string
  footerNoMoreDataText?: string
  footerRefreshingText?: string
  footerLoadMoreText?: string
  footerFailureText?: string,
  empty?: any,
  count?: number,
  onFooterRefresh?: () => Promise<any>,
  onHeaderRefresh?: () => Promise<any>,
  after?: number,
}