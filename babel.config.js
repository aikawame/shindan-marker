const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        chrome: '74',
        firefox: '66'
      }
    }
  ]
]

module.exports = { presets }
