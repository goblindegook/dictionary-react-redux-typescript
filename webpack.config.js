'use strict'

const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true&overlay=true',
      './src/index'
    ]
  },
  output: {
    chunkFilename: '[name].[chunkhash].chunk.js',
    filename: 'main.js',
    path: path.join(__dirname, 'dist/static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PORT: JSON.stringify(process.env.PORT)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      { context: 'assets', from: '**/*', to: '.' }
    ]),
    new ExtractTextPlugin({
      filename: 'main.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'react-hot-loader/webpack',
          'ts-loader?sourceMap'
        ],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: [
          'style-loader?sourceMap',
          'css-loader?importLoaders=1&modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
        ],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader?sourceMap',
          'css-loader?importLoaders=1&modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?outputStyle=expanded&sourceMap&sourceMapContents'
        ],
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
