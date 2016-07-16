declare module "webpack-dev-middleware" {
  import express = require("express");
  import webpack = require("webpack");
  function webpackDevMiddleware(compiler: webpack.compiler.Compiler, options?: Object):
    (req: express.Request, res: express.Response, next: express.NextFunction) => any;
  export = webpackDevMiddleware;
}
