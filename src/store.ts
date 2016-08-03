import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import { browserHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "./reducers";
import sagas from "./sagas";

/* tslint:disable:no-string-literal */
const devTools = global["devToolsExtension"] || (() => noop => noop);
/* tslint:enable:no-string-literal */

export default function configureStore(initialState: Object = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    routerMiddleware(browserHistory),
    sagaMiddleware,
  ];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      devTools()
    )
  ) as any;

  sagaMiddleware.run(sagas);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  // Hot reload reducers:
  // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
  /* tslint:disable:no-string-literal */
  if (process.env.NODE_ENV === "development" && module["hot"]) {
    module["hot"].accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }
  /* tslint:enable:no-string-literal */

  return store;
}
