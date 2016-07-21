'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  debug: true,
  devtool: '#eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true&overlay=true',
    './src/index'
  ],
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PORT: JSON.stringify(process.env.PORT)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'react-hot!babel?cacheDirectory!ts?sourceMap',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style?sourceMap!css?importLoaders=1&modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: 'style?sourceMap!css?importLoaders=1&modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass',
        include: path.join(__dirname, 'src')
      }
    ]
  },
  sassLoader: {
    outputStyle: 'expanded',
    sourceMap: true,
    sourceMapContents: true
  },
  output: {
    chunkFilename: '[name]-[chunkhash].js',
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/static'),
    publicPath: '/static/'
  }
}
