import * as Express from "express";
import proxy = require("http-proxy-middleware");
import webpack = require("webpack");
import webpackDevMiddleware = require("webpack-dev-middleware");
import webpackHotMiddleware = require("webpack-hot-middleware");
import { browserHistory, match } from "react-router";
import routes from "../routes";
import render from "./render";

const config = require("../../webpack.config.js");
const port = process.env.PORT || 3000;
const app = Express();
const compiler = webpack(config);

app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use("/api", proxy({
  changeOrigin: true,
  pathRewrite: { "^/api": "" },
  target: "http://dicionario-aberto.net",
}));

app.use((req, res) => {
  match(<any> {
    history: browserHistory,
    location: req.url,
    routes,
  }, render(req, res));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`🌎  Listening on http://localhost:${port}/.`);
  }
});
