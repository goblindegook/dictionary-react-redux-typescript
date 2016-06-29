'use strict'

require('ts-node/register')

const fs = require('fs')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { match, RouterContext } = require('react-router')

const config = require('./webpack.config')
const routes = require('./src/routes').default

const port = process.env.PORT || 3000
const app = new express()
const compiler = webpack(config)

app.use(webpackHotMiddleware(compiler))
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use((req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const body = fs.readFileSync(path.join(__dirname, 'index.html')).toString()
      const markup = renderToString(React.createElement(RouterContext, renderProps))
      res.send(body.replace('<!-- APP -->', markup))
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info('🌎  Listening on http://localhost:%s/.', port)
  }
})
