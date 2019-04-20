import ChromeStorage from './chrome_storage.js'

window.onload = () => {
  ChromeStorage.load()
    .then(storage => {
      const appearanceInputs = document.options.elements['appearance']
      const serviceInputs = document.options.elements['services[]']
      appearanceInputs.forEach(input => {
        if (input.value === storage.get('appearance')) {
          input.checked = true
        }
        input.addEventListener('change', () => {
          storage.set('appearance', input.value)
        })
      })
      serviceInputs.forEach(input => {
        if (storage.get('services').indexOf(input.value) !== -1) {
          input.checked = true
        }
        input.addEventListener('change', () => {
          storage.set(
            'services',
            Array.from(serviceInputs)
              .filter(el => el.checked)
              .map(el => el.value)
          )
        })
      })
    })
    .catch(() => {
      alert('設定を読み込めませんでした。')
    })
}
