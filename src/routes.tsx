import * as React from "react"
import { IndexRoute, Route } from "react-router"
import { App } from "./containers/App"
import { ConnectedDefinition } from "./containers/Definition"
import { ConnectedSearch } from "./containers/Search"

export const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={ConnectedSearch}/>
    <Route path="search(/:prefix)" component={ConnectedSearch} />
    <Route path="define/:id" component={ConnectedDefinition} />
  </Route>
)
