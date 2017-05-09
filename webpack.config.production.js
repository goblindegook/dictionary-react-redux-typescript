'use strict'

const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  bail: true,
  devtool: 'cheap-source-map',
  entry: {
    main: './src/index',
    vendor: [
      'classnames',
      'isomorphic-fetch',
      'lodash',
      'react',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-actions',
      'redux-saga',
      'serialize-javascript'
    ]
  },
  output: {
    chunkFilename: '[name].[chunkhash].chunk.js',
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist/static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PORT: JSON.stringify(process.env.PORT)
      }
    }),
    new CopyPlugin([
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
      },
      minimize: true
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new AssetsPlugin({ path: 'dist' })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader'
        ],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?-autoprefixer&importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]'
            // 'postcss-loader'
          ]
        }),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?-autoprefixer&importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
            // 'postcss-loader',
            'sass-loader'
          ]
        }),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
