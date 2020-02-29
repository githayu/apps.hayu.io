const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

/**
 * webpack common config
 * @type import('webpack').Configuration
 */
module.exports.common = {
  output: {
    chunkFilename: 'js/chunks/[chunkhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        buleprint: {
          name: 'blueprint',
          test: /[\\/]node_modules[\\/]@blueprintjs[\\/]/,
        },
      },
    },
  },
}

/**
 * webpack backend config
 * @type import('webpack').Configuration
 */
module.exports.backend = {
  name: 'backend',
  target: 'node',
  entry: {
    server: path.join(__dirname, '../src/backend/server.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist/backend'),
  },
  externals: [
    (context, request, callback) => {
      if (/webpack|express/.test(request)) {
        return callback(null, ['commonjs2', request].join(' '))
      }

      callback()
    },
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: '12',
                },
                useBuiltIns: 'usage',
                corejs: 3,
              },
            ],
            ['@babel/preset-typescript'],
          ],
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
}

/**
 * webpack frontend config
 * @type import('webpack').Configuration
 */
module.exports.frontend = {
  name: 'frontend',
  target: 'web',
  output: {
    path: path.join(__dirname, '../dist/frontend'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: '**/*', to: './', context: 'static/' }], {
      copyUnmodified: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/template.html'),
      filename: 'index.html',
      chunks: ['vendor', 'index'],
      title: 'apps.hayu.io',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/template.html'),
      filename: 'random.html',
      chunks: ['vendor', 'blueprint', 'random'],
      title: 'ランダム文字列ジェネレーター',
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
}

/**
 * webpack common development config
 * @type import('webpack').Configuration
 */
module.exports.development = {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
  ],
}

/**
 * webpack common production config
 * @type import('webpack').Configuration
 */
module.exports.production = {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
  ],
}
