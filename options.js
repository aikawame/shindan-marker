const defaultSettings = {
  appearance: 'highlighter',
  services: ['shindanmaker', 'applimaker']
}
window.onload = () => {
  chrome.storage.sync.get(defaultSettings, settings => {
    const appearanceInputs = document.options.elements['appearance']
    const serviceInputs = document.options.elements['services[]']
    appearanceInputs.forEach(input => {
      if (input.value === settings.appearance) {
        input.checked = true
      }
      input.addEventListener('change', () => {
        chrome.storage.sync.set({
          appearance: input.value
        })
      })
    })
    serviceInputs.forEach(input => {
      if (settings.services.indexOf(input.value) !== -1) {
        input.checked = true
      }
      input.addEventListener('change', () => {
        chrome.storage.sync.set({
          services: Array.from(serviceInputs)
            .filter(el => el.checked)
            .map(el => el.value)
        })
      })
    })
  })
}
