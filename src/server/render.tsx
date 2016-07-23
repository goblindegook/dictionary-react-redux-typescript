import * as React from "react";
import "react-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { RouterContext } from "react-router";
import { fork, join } from "redux-saga/effects";
import configureStore from "../store";
import compileAssets from "./compileAssets";
import Document from "../containers/Document";

/**
 * Wait for all preload sagas to complete.
 * @param  {Array} sagas Preload sagas.
 */
function waitAll(sagas) {
  return function* () {
    const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params));
    yield tasks.map(join);
  };
}

function render(req, res, renderProps) {
  const { components, params } = renderProps;
  const store = configureStore();

  const preloaders = components
    .filter(component => component && component.preload)
    .map(component => component.preload(params))
    .reduce((result, preloader) => result.concat(preloader), []);

  store.runSaga(waitAll(preloaders)).done
    .then(() => {
      const app = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.send("<!DOCTYPE HTML>\n" + renderToString(
        <Document app={app} assets={compileAssets()} server store={store} />
      ));
    })
    .catch((sagaError) => {
      res.status(500).send(sagaError.message);
    });
}

export default render;
