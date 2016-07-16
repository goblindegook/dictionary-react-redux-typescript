import * as React from "react";
import "react-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { RouterContext } from "react-router";
import { fork, join } from "redux-saga/effects";
import configureStore from "../store";
import Document from "../containers/Document";

function waitAll(sagas) {
  return function* () {
    const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params));
    yield tasks.map(join);
  };
}

function render(req, res) {
  return (error, redirectLocation, renderProps): void => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const { components, params } = renderProps;
      const store = configureStore();

      const preloaders = components
        .filter(component => component.preload)
        .map(component => component.preload(store.dispatch, params))
        .reduce((result, preloader) => result.concat(preloader), []);

      store.runSaga(waitAll(preloaders)).done
        .then(() => {
          const app = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          res.send("<!DOCTYPE HTML>\n" + renderToString(
            <Document app={app} store={store} />
          ));
        })
        .catch((sagaError) => {
          res.status(500).send(sagaError.message);
        });
    } else {
      res.status(404).send("Not found");
    }
  };
}

export default render;
