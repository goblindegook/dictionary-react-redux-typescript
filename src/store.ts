import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import sagas from "./sagas";

/* tslint:disable:no-string-literal */
const devtools = global["devToolsExtension"] || (() => noop => noop);
/* tslint:enable:no-string-literal */

export default function configureStore(initialState: any = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      devtools()
    )
  );

  sagaMiddleware.run(sagas);

  // Hot reload reducers:
  // https://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
  /* tslint:disable:no-string-literal */
  if (module["hot"]) {
    module["hot"].accept("./reducers", () => {
      const nextRootReducer = require("./reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }
  /* tslint:enable:no-string-literal */

  return store;
}
