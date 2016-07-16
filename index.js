'use strict'

require('ts-node/register')

const Express = require('express')
const proxy = require('http-proxy-middleware')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { browserHistory, match } = require('react-router')
const config = require('./webpack.config')
const routes = require('./src/routes').default
const render = require('./src/server/render').default

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
  target: 'http://dicionario-aberto.net'
}))

app.use((req, res) => {
  match({
    history: browserHistory,
    location: req.url,
    routes
  }, render(req, res))
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info('🌎  Listening on http://localhost:%s/.', port)
  }
})
