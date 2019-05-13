const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlgin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports.default = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'js/[id].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      src: path.resolve(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              'react-hot-loader/babel',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlgin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../static/template.html'),
      filename: 'random.html',
      chunks: ['app'],
      title: 'ランダム文字列ジェネレーター',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new CopyWebpackPlugin([{ from: '**/*', to: './', context: 'public/' }]),
  ],
}
