import * as React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./containers/App";
import Definition from "./containers/Definition";
import Search from "./containers/Search";

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Search}/>
      <Route path="/search(/:query)" component={Search} />
      <Route path="/define/:word(/:index)" component={Definition} />
    </Route>
  </Router>
);
