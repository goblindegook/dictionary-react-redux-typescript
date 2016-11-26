import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { browserHistory, Router } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import { IApplicationState } from "./reducers"
import { routes } from "./routes"
import { configureStore } from "./store"

/* tslint:disable:no-var-requires */
require("./styles/global.scss")
/* tslint:enable:no-var-requires */

/* tslint:disable:no-string-literal */
const preloadedState: IApplicationState = global["window"] && global["window"]["__PRELOADED__"]

if (module["hot"]) {
  module["hot"].accept()
}
/* tslint:enable:no-string-literal */

const store = configureStore(preloadedState)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById("root"),
)
