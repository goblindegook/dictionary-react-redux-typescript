declare module "webpack-hot-middleware" {
  import express = require("express");
  import webpack = require("webpack");
  function webpackHotMiddleware(compiler: webpack.compiler.Compiler):
    (req: express.Request, res: express.Response, next: express.NextFunction) => any;
  export = webpackHotMiddleware;
}
