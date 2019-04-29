export default class KeywordManager {
  static get SERVICE_URLS() {
    return {
      shindanmaker: 'https://assets.wor.jp/rss/json/shindanmaker/hot.json',
      applimaker: 'https://assets.wor.jp/rss/json/applimaker/ranking.json'
    }
  }

  static get JSON_CHECK_MIN() {
    return 20
  }

  constructor(services) {
    this._keywords = []
    this._targetServiceUrls = services.map(service => KeywordManager.SERVICE_URLS[service])
  }

  getKeywords() {
    return this._keywords
  }

  repeatUpdating() {
    this._update()
    setTimeout(() => this.repeatUpdating(), this._getUpdatingLatency())
  }

  _update() {
    const fetchPromises = this._targetServiceUrls.map(url => fetch(url))
    Promise.all(fetchPromises).then(responses => {
      const promises = responses.map(response => response.json())
      Promise.all(promises).then(jsons => {
        this._keywords = jsons.reduce((prev, current) => prev.concat(current)).map(keyword => keyword.replace('#', ''))
      })
    })
  }

  _getUpdatingLatency() {
    const currentMin = new Date().getMinutes()
    if (currentMin < KeywordManager.JSON_CHECK_MIN) {
      return 60 * 1000 * (KeywordManager.JSON_CHECK_MIN - currentMin)
    } else {
      return 60 * 1000 * (KeywordManager.JSON_CHECK_MIN - currentMin + 60)
    }
  }
}
