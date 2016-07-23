'use strict'

const path = require('path')
const webpack = require('webpack')
const assign = require('lodash/assign')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./webpack.config')

module.exports = assign(config, {
  bail: true,
  debug: false,
  devtool: 'cheap-source-map',
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
    new CopyWebpackPlugin([
      { context: 'assets', from: '**/*', to: '.' }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      }
    }),
    // TODO: [name].[contenthash].css
    new ExtractTextPlugin('bundle.css')
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
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer&importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss'),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer&importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file'
      }
    ]
  },
  postcss: () => [
    autoprefixer
  ],
  sassLoader: {
    outputStyle: 'expanded',
    sourceMap: false,
    sourceMapContents: false
  }
})
