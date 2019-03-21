;(() => {
  const contentUrl = chrome.extension.getURL('content.js')
  const script = document.createElement('script')
  script.setAttribute('type', 'module')
  script.setAttribute('src', contentUrl)
  document.body.appendChild(script)
})()
