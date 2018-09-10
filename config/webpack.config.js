const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlgin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports.cssLoaderOptions = {
  localIdentName: '[folder]-[md5:hash:hex:8]',
}

module.exports.postCssLoaderOptions = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 version'],
    }),
  ],
}

module.exports.default = {
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
          name: '[md5:hash:8].[ext]',
          outputPath: 'assets/',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlgin([path.resolve(__dirname, '../dist/')], {
      allowExternal: true,
    }),
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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
