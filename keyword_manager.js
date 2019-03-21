class KeywordManager {
  constructor() {
    this._JSON_URLS = [
      'https://assets.wor.jp/rss/json/shindanmaker/hot.json',
      'https://assets.wor.jp/rss/json/applimaker/ranking.json'
    ]
    this._JSON_CHECK_MIN = 20

    this._keywords = []
  }

  getKeywords() {
    return this._keywords
  }

  repeatUpdating() {
    this._update()
    setTimeout(() => this.repeatUpdating(), this._getUpdatingLatency())
  }

  _update() {
    const fetchPromises = this._JSON_URLS.map(url => fetch(url))
    Promise.all(fetchPromises).then(responses => {
      const promises = responses.map(response => response.json())
      Promise.all(promises).then(jsons => {
        this._keywords = jsons
          .reduce((prev, current) => prev.concat(current))
          .map(keyword => keyword.replace('#', ''))
      })
    })
  }

  _getUpdatingLatency() {
    const currentMin = new Date().getMinutes()
    if (currentMin < this._JSON_CHECK_MIN) {
      return 60 * 1000 * (this._JSON_CHECK_MIN - currentMin)
    } else {
      return 60 * 1000 * (this._JSON_CHECK_MIN - currentMin + 60)
    }
  }
}

export default new KeywordManager()
