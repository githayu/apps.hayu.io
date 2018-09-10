const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  default: config,
  cssLoaderOption,
  postCssLoaderOptions,
} = require('./webpack.config')

module.exports = webpackMerge(config, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
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
              minimize: false,
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
              ...cssLoaderOption,
              modules: true,
              importLoaders: 2,
              minimize: false,
              sourceMap: true,
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
    minimize: false,
  },
})
