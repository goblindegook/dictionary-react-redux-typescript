import * as React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./containers/App";
import Definition from "./containers/Definition";
import Search from "./containers/Search";

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Search}/>
    <Route path="search(/:prefix)" component={Search} />
    <Route path="define/:id" component={Definition} />
  </Route>
);
