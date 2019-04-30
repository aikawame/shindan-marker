export default class ShindanMarker {
  static MAX_RETRY_COUNT() {
    return 10
  }

  constructor(keywordManager, targetSelector, appearance) {
    this._keywordManager = keywordManager
    this._targetSelector = targetSelector
    this._appearance = appearance
  }

  execute(tryCount = 0) {
    if (tryCount >= ShindanMarker.MAX_RETRY_COUNT) return
    const trendLinks = document.querySelectorAll(this._targetSelector)
    if (trendLinks.length > 3) {
      for (let trendLink of trendLinks) {
        this._mark(trendLink)
        this._observeTrends(trendLink)
      }
    } else {
      tryCount += 1
      setTimeout(() => this.execute(tryCount), tryCount * 1000)
    }
  }

  _observeTrends(trendLink) {
    const observer = new MutationObserver(records => {
      this._mark(records[0].target)
    })
    observer.observe(trendLink, { characterData: true, childList: true })
  }

  _mark(trendLink) {
    for (let keyword of this._keywordManager.getKeywords()) {
      if (keyword.indexOf(trendLink.textContent.replace('#', '')) > -1) {
        if (this._appearance === 'highlighter') {
          trendLink.style.backgroundColor = '#ffff00'
        } else {
          trendLink.style.textDecoration = 'line-through'
        }
        break
      }
    }
  }
}
