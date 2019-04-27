import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const IS_DEVELOPMENT = process.argv.includes('development')

export default {
  entry: {
    content: `${__dirname}/app/content.js`,
    options: `${__dirname}/app/options.js`
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js'
  },
  devtool: IS_DEVELOPMENT ? 'inline-source-map' : false,
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
