const path = require('path')
const merge = require('webpack-merge')
const NodemonPlugin = require('nodemon-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { common, backend, development } = require('./webpack.common')

module.exports = [
  merge(common, backend, development, {
    plugins: [
      new NodemonPlugin({
        watch: path.join(__dirname, '../dist/backend'),
        script: path.join(__dirname, '../dist/backend/server.js'),
      }),
    ],
  }),

  merge(common, frontend, development, {
    entry: {
      index: [
        'webpack-hot-middleware/client',
        path.join(__dirname, '../src/frontend/index.tsx'),
      ],
      random: [
        'webpack-hot-middleware/client',
        path.join(__dirname, '../src/frontend/random.tsx'),
      ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: 'last 2 versions', useBuiltIns: 'usage', corejs: 3 },
              ],
              ['@babel/preset-typescript'],
              ['@babel/preset-react'],
            ],
            plugins: ['react-refresh/babel'],
          },
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin({
        disableRefreshCheck: true,
      }),
    ],
  }),
]
