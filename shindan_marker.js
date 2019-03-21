export default class ShindanMarker {
  constructor(keywordManager, targetSelector) {
    this._keywordManager = keywordManager
    this._targetSelector = targetSelector
  }

  execute() {
    const trendLinks = document.querySelectorAll(this._targetSelector)
    if (trendLinks.length >= 10) {
      for (let trendLink of trendLinks) {
        this._mark(trendLink)
        this._observeTrends(trendLink)
      }
    } else {
      setTimeout(() => this.execute(), 1000)
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
        trendLink.style.textDecoration = 'line-through'
        break
      }
    }
  }
}
