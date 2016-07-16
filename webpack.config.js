'use strict'

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('./dist/bundle.css', { allChunks: true })
  ],
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: [
          'babel?cacheDirectory',
          'ts?sourceMap'
        ],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
        ],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?importLoaders=2&sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass'
        ],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  sassLoader: {
    outputStyle: 'expanded',
    sourceMap: true,
    sourceMapContents: true
  }
}
