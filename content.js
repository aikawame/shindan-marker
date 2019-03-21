import keywordManager from './keyword_manager.js'
import ShindanMarker from './shindan_marker.js'

keywordManager.repeatUpdating()
let shindanMarker = new ShindanMarker(
  keywordManager,
  "a[data-testid='trendLink']"
)
shindanMarker.execute()
