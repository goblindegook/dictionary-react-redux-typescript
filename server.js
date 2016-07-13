'use strict'

require('ts-node/register')

const fs = require('fs')
const path = require('path')
const Express = require('express')
const proxy = require('http-proxy-middleware')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { match, RouterContext } = require('react-router')
const { Resolver } = require('react-resolver')
const config = require('./webpack.config')
const routes = require('./src/routes').default

const port = process.env.PORT || 3000
const app = new Express()
const compiler = webpack(config)

app.use(webpackHotMiddleware(compiler))
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use('/api', proxy({
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  target: 'http://dicionario-aberto.net',
}))

app.use((req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const body = fs.readFileSync(path.join(__dirname, 'index.html')).toString()
      Resolver
        .resolve(() => React.createElement(RouterContext, renderProps))
        .then(({ Resolved, data }) => {
          res.send(body
            .replace('<!-- APP -->', renderToString(createElement(Resolved))
            .replace('<!-- PAYLOAD -->', `<script>window.__REACT_RESOLVER_PAYLOAD__ = ${JSON.stringify(data)}</script>`)
          ))
        })
        .catch((error) => {
          res.status(500).send(error)
        })
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
