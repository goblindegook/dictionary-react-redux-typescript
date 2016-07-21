'use strict'

const path = require('path')
const webpack = require('webpack')
const assign = require('lodash/assign')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./webpack.config')

module.exports = assign(config, {
  debug: false,
  devtool: '#cheap-source-map',
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PORT: JSON.stringify(process.env.PORT)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    }),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true,
      filename: '[name]-[chunkhash].css'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'babel?cacheDirectory!ts!tslint',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]'),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]!sass'),
        include: path.join(__dirname, 'src')
      }
    ]
  },
  sassLoader: {
    outputStyle: 'expanded',
    sourceMap: false,
    sourceMapContents: false
  }
})
