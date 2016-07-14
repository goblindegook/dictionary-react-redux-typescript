import * as React from "react";
import { Router, browserHistory } from "react-router";
import { render } from "react-dom";
import routes from "./routes";

/* tslint:disable:no-string-literal */
if (module["hot"]) {
  module["hot"].accept();
}
/* tslint:enable:no-string-literal */

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById("root")
);
