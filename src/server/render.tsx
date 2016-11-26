import { Request, Response } from "express"
import * as React from "react"
import "react-dom"
import { renderToString } from "react-dom/server"
import { Provider } from "react-redux"
import { Router, RouterContext } from "react-router"
import { Action } from "redux-actions"
import { fork, join } from "redux-saga/effects"
import { Document } from "../containers/Document"
import { configureStore } from "../store"
import { compileAssets } from "./compileAssets"

type Preloader = Array<Array<IterableIterator<any> | Action<any>>>
type PreloadedComponent = React.ReactType & { preload: (params: Router.Params) => Preloader }

/**
 * Wait for all preload sagas to complete.
 * @param  {Array} sagas Preload sagas.
 */
function waitAll(sagas: any[]) {
  return function* () {
    const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params))
    yield tasks.map(join)
  }
}

export function render(req: Request, res: Response, renderProps: RouterContext.RouterContextProps) {
  const { components, params } = renderProps
  const store = configureStore()

  const preloaders: Preloader = (components || [])
    .filter((c: PreloadedComponent) => c.preload)
    .reduce((r: Preloader, c: PreloadedComponent) => r.concat(c.preload(params)), [])

  store.runSaga(waitAll(preloaders)).done
    .then(() => {
      const app = (
        <Provider store={store}>
          <RouterContext {...(renderProps as any)} />
        </Provider>
      )

      res.send("<!DOCTYPE HTML>\n" + renderToString((
        <Document app={app} assets={compileAssets()} server store={store} />
      )))
    })
    .catch((sagaError: Error) => {
      res.status(500).send(sagaError.message)
    })
}
