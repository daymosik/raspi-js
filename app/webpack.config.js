const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.tsx',
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: 'bundle.[hash].js',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      enforce: 'pre',
      loader: 'tslint-loader'
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.png$/,
      loader: "url-loader?limit=100000"
    }, {
      test: /\.jpg$/,
      loader: "file-loader"
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '@components': path.join(__dirname, 'src/components'),
      '@modules': path.join(__dirname, 'src/modules'),
      '@services': path.join(__dirname, 'src/services'),
      '@functions': path.join(__dirname, 'src/functions'),
      '@classes': path.join(__dirname, 'src/classes'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.DefinePlugin({
      'process.env': {
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      }
    }),
  ]
};
