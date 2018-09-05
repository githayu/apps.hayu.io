const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlgin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env, args) => {
  console.log(env, args)

  const mode = process.env.NODE_ENV || 'development'
  const PRODUCTION = mode === 'production'

  return {
    mode,
    entry: {
      main: [path.resolve(__dirname, './src/App.tsx')],
    },
    output: {
      filename: PRODUCTION ? 'js/[name].js' : 'js/[hash].js',
      path: path.resolve(__dirname, './dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss'],
    },
    devtool: PRODUCTION ? false : 'inline-source-map',
    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'all',
      },
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  minimize: PRODUCTION,
                  sourceMap: !PRODUCTION,
                  localIdentName: '[folder]-[hash:base64:5]',
                },
              },
              {
                loader: 'sass-loader',
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      new CleanWebpackPlgin(['dist']),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
      }),
      new ExtractTextPlugin({
        filename: PRODUCTION ? 'css/[hash].css' : 'css/[name].css',
        allChunks: true,
      }),
    ],
  }
}
