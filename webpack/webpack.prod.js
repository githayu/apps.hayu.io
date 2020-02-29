const path = require('path')
const merge = require('webpack-merge')
const { common, backend, frontend, production } = require('./webpack.common')

module.exports = [
  merge(common, backend, production),
  merge(common, frontend, production, {
    entry: {
      index: path.join(__dirname, '../src/frontend/index.tsx'),
      random: path.join(__dirname, '../src/frontend/random.tsx'),
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
          },
        },
      ],
    },
    plugins: [
      // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
      //   openAnalyzer: false,
      // }),
    ],
  }),
]
