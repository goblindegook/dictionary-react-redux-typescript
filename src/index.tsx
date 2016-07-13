import * as React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Resolver } from "react-resolver";
import routes from "./routes";

/* tslint:disable:no-string-literal */
if (module["hot"]) {
  module["hot"].accept();
}
/* tslint:enable:no-string-literal */

Resolver.render(
  () => <Router history={browserHistory} routes={routes} />,
  document.getElementById("root")
);
