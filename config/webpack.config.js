const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlgin = require('clean-webpack-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'js/[id].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
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
      {
        exclude: [/\.(j|t)sx?$/, /\.html$/, /\.json$/, /\.s?css$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'assets/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlgin([path.resolve(__dirname, '../dist/')], {
      allowExternal: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'random.html',
      chunks: ['app'],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
