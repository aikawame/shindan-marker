import ChromeStorage from './chrome_storage.js'
import KeywordManager from './keyword_manager.js'
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
  ChromeStorage.load().then(storage => {
    let keywordManager = new KeywordManager(storage.get('services'))
    keywordManager.repeatUpdating()
    let shindanMarker = new ShindanMarker(keywordManager, targetSelector, storage.get('appearance'))
    shindanMarker.execute()
  })
}
