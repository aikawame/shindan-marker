const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    content: `${__dirname}/app/content.js`,
    options: `${__dirname}/app/options.js`
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: `${__dirname}/app/manifest.json`,
        to: `${__dirname}/dist`
      }
    ]),
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/options.html`,
      filename: 'options.html',
      chunks: ['options']
    })
  ]
}
