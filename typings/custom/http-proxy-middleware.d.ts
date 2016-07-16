declare module "http-proxy-middleware" {
  import express = require("express");
  function proxy(context: Object, opts?: Object):
    (req: express.Request, res: express.Response, next: express.NextFunction) => any;
  export = proxy;
}
