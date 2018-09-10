const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const {
  default: config,
  cssLoaderOptions,
  postCssLoaderOptions,
} = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    new MiniCssExtractPlugin({
      filename: 'css/[hash].css',
      chunkFilename: 'css/[id].chunk.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssLoaderOptions,
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              ...cssLoaderOptions,
              modules: true,
              importLoaders: 2,
              minimize: true,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssLoaderOptions,
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
})
