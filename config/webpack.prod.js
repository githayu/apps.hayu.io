const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const { default: config } = require('./webpack.config')

module.exports = webpackMerge(config, {
  mode: 'production',
  devtool: false,
  entry: {
    app: path.resolve(__dirname, '../src/App.tsx'),
  },
  output: {
    filename: 'js/[hash].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
  ],
  optimization: {
    minimize: true,
  },
})
