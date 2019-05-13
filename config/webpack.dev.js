const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const { default: config } = require('./webpack.config')

module.exports = webpackMerge(config, {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, '../src/App.tsx'),
    ],
  },
  output: {
    filename: 'js/[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
  ],
  optimization: {
    minimize: false,
  },
})
