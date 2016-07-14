'use strict'

require('ts-node/register')

const fs = require('fs')
const path = require('path')
const Express = require('express')
const proxy = require('http-proxy-middleware')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const serialize = require('serialize-javascript')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { Provider } = require('react-redux')
const { match, RouterContext } = require('react-router')
const { fork, join } = require('redux-saga/effects')
const config = require('./webpack.config')
const configureStore = require('./src/store').default
const routes = require('./src/routes').default

const port = process.env.PORT || 3000
const app = new Express()
const compiler = webpack(config)

const waitAll = (sagas) => function* () {
  const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params))
  yield tasks.map(join)
}

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
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const { components, params } = renderProps
      const store = configureStore({})
      const preloaders = components
        .filter(component => component && component.preload)
        .map(component => component.preload(params))
        .reduce((result, preloader) => result.concat(preloader), [])

      store.runSaga(waitAll(preloaders)).done
        .then(() => {
          const state = serialize(store.getState())
          const body = fs.readFileSync(path.join(__dirname, 'index.html')).toString()

          const markup = renderToString(
            React.createElement(Provider, { store },
              React.createElement(RouterContext, renderProps)
            )
          )

          res.send(body
            .replace('<!-- APP -->', markup)
            .replace('<!-- STATE -->', `<script>window.__PRELOADED__ = ${state}</script>`)
          )
        })
        .catch((error) => {
          res.status(500).send(error.message)
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
