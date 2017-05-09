import * as express from "express"
import proxy = require("http-proxy-middleware")
import webpack = require("webpack")
import webpackDevMiddleware = require("webpack-dev-middleware")
import webpackHotMiddleware = require("webpack-hot-middleware")
import { browserHistory, match } from "react-router"
import { routes } from "../routes"
import { handleRoute } from "./handleRoute"

const port = process.env.PORT || 3000
const app = express()

if (process.env.NODE_ENV === "development") {
  /* tslint:disable:no-var-requires */
  const config = require("../../webpack.config")
  /* tslint:enable:no-var-requires */
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }))
}

app.use("/api/", proxy({
  changeOrigin: true,
  pathRewrite: { "^/api/": "/" },
  // FIXME: Move to configuration file.
  target: "http://dicionario-aberto.net",
}))

app.use(express.static("dist", {
  extensions: ["css", "js"],
  index: false,
}))

app.use((req, res) => {
  match({
    history: browserHistory,
    location: req.url,
    routes,
  }, handleRoute(req, res))
})

app.listen(port, (error: Error) => {
  if (error) {
    // tslint:disable-next-line:no-console
    console.error(error)
  } else {
    // tslint:disable-next-line:no-console
    console.info(`🌎  Listening on http://localhost:${port}/.`)
  }
})
