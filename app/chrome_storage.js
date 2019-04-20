export default class ChromeStorage {
  static get DEFAULT_SETTINGS() {
    return {
      appearance: 'highlighter',
      services: ['shindanmaker', 'applimaker']
    }
  }

  static load() {
    return new Promise((resolve, reject) => {
      if (!chrome || !chrome.storage) {
        reject(new Error('chrome.storage is not available.'))
      }
      chrome.storage.sync.get(this.DEFAULT_SETTINGS, items => {
        resolve(new ChromeStorage(items))
      })
    })
  }

  constructor(items) {
    this._items = items
  }

  get(key) {
    return this._items[key]
  }

  set(key, value) {
    chrome.storage.sync.set({ [key]: value }, () => {
      this._items[key] = value
    })
  }
}
