import * as React from "react";
import { Router, browserHistory } from "react-router";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "./store";
import routes from "./routes";

/* tslint:disable:no-string-literal */
const preloadedState = global['window'] && global['window']['__PRELOADED__'];

if (module["hot"]) {
  module["hot"].accept();
}
/* tslint:enable:no-string-literal */

const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
