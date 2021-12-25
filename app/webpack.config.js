const isProd = process.env.NODE_ENV === 'production'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const shouldAnalize = false

const defaultPlugins = [
  new HtmlWebpackPlugin({ template: './src/index.html' }),
  new MiniCssExtractPlugin({
    filename: `[name].[chunkhash].css`,
    chunkFilename: `[id].[chunkhash].css`,
  }),
  new WebpackPwaManifest({
    name: 'RaspiJS',
    short_name: 'RaspiJS',
    description: '',
    background_color: '#ffffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    icons: [
      {
        src: path.resolve('src/assets/images/logo-vertical.png'),
        sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      },
      {
        src: path.resolve('src/assets/images/logo-vertical.png'),
        size: '1024x1024', // you can also use the specifications pattern
      },
    ],
  }),
  new webpack.DefinePlugin({
    'process.env': {
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      FIREBASE_APP_ID: JSON.stringify(process.env.FIREBASE_APP_ID),
    },
  }),
  new WorkboxPlugin.GenerateSW({
    swDest: 'sw.js',
    clientsClaim: true,
    skipWaiting: true,
  }),
]

const analyzePlugins = [new BundleAnalyzerPlugin()]

const rules = [
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
  },
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  },
  {
    test: /\.(jpg|jpeg|svg|gif|png(2)?)(\?[a-z0-9]+)?$/,
    loader: 'file-loader',
    options: {
      esModule: false,
    },
  },
  {
    test: /\.(svg|eot|woff|woff2|ttf)$/,
    type: 'asset/resource',
    generator: {
      //publicPath: '../fonts/',
      filename: 'compiled/fonts/[hash][ext][query]',
    },
  },
  {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
  {
    test: /node_modules[/\\]createjs/,
    use: [
      {
        loader: 'exports-loader',
        options: {
          type: 'commonjs',
          exports: 'single window.createjs',
        },
      },
    ],
  },
  {
    test: /node_modules[/\\]createjs/,
    use: [
      {
        loader: 'imports-loader',
        options: {
          wrapper: 'window',
        },
      },
    ],
  },
]

module.exports = {
  entry: './src/app.tsx',
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: '[name].[hash].js',
  },
  ...(!isProd && {
    devtool: 'source-map',
  }),
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '@assets': path.join(__dirname, 'src/assets'),
      '@components': path.join(__dirname, 'src/components'),
      '@modules': path.join(__dirname, 'src/modules'),
      '@services': path.join(__dirname, 'src/services'),
      '@functions': path.join(__dirname, 'src/functions'),
      '@classes': path.join(__dirname, 'src/classes'),
      '@models': path.join(__dirname, 'src/models'),
    },
  },
  plugins: shouldAnalize ? [...analyzePlugins, ...defaultPlugins] : defaultPlugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          minSize: 1,
        },
      },
    },
  },
}
