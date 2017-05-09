import { Request, Response } from "express"
import * as React from "react"
import "react-dom"
import { renderToString } from "react-dom/server"
import { Provider } from "react-redux"
import { Router, RouterContext } from "react-router"
import { Task } from "redux-saga"
import { all, fork, join } from "redux-saga/effects"
import { Document } from "../containers/Document"
import { Preloader } from "../sagas"
import { DefinitionTaskEffect } from "../sagas/definition"
import { SearchTaskEffect } from "../sagas/search"
import { configureStore } from "../store"
import { getAssets } from "./getAssets"

type PreloadTask = Preloader<DefinitionTaskEffect | SearchTaskEffect, string>

type PreloadedComponent = React.ReactType & {
  preload: (params: Router.Params) => PreloadTask,
}

/**
 * Wait for all preload tasks to complete.
 * @param  {Array} sagas Preload tasks.
 */
function waitAll(preloadTasks: PreloadTask[]) {
  return function*() {
    const tasks: Task[] = yield preloadTasks.map(([worker, action]) => fork(worker, action))
    yield all(tasks.map((t) => join(t)))
  }
}

export function render(req: Request, res: Response, renderProps: RouterContext.RouterContextProps) {
  const { components, params } = renderProps
  const store = configureStore()

  const preloaders: PreloadTask[] = (components || [])
    .filter((c: PreloadedComponent) => c.preload)
    .reduce((t: PreloadTask[], c: PreloadedComponent) => t.concat(c.preload(params)), [])

  store.runSaga(waitAll(preloaders)).done
    .then(() => {
      const app = (
        <Provider store={store}>
          <RouterContext {...(renderProps as any)} />
        </Provider>
      )

      res.send("<!DOCTYPE HTML>\n" + renderToString((
        <Document app={app} assets={getAssets()} server store={store} />
      )))
    })
    .catch((sagaError: Error) => {
      res.status(500).send(sagaError.message)
    })
}
