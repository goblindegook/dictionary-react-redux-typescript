'use strict'

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true&overlay=true',
    './src/index'
  ],
  output: {
    chunkFilename: '[name]-[chunkhash].js',
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // development
    new webpack.NoErrorsPlugin(), // development
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PORT: JSON.stringify(process.env.PORT)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.DedupePlugin(), // production
    // new webpack.optimize.UglifyJsPlugin(), // production
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name]-[chunkhash].css'
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: [
          'react-hot',
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
          // ExtractTextPlugin.extract({
          //   notExtractLoader: 'style-loader',
          //   loaders: ['css-loader', 'sass-loader']
          // }),
          'style?sourceMap',
          'css?importLoaders=2&modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
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
