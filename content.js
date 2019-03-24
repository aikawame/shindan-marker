import keywordManager from './keyword_manager.js'
import ShindanMarker from './shindan_marker.js'

let targetSelector = null
switch (window.location.hostname) {
  case 'twitter.com':
    targetSelector = "div[data-testid='trend'] > div:nth-child(2) > span"
    break
  case 'tweetdeck.twitter.com':
    targetSelector = "a[data-testid='trendLink']"
    break
}
if (targetSelector) {
  keywordManager.repeatUpdating()
  let shindanMarker = new ShindanMarker(keywordManager, targetSelector)
  shindanMarker.execute()
}
