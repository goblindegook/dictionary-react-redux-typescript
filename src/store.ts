import { browserHistory } from "react-router"
import { routerMiddleware } from "react-router-redux"
import { applyMiddleware, compose, createStore, Store } from "redux"
import createSagaMiddleware, { END } from "redux-saga"
import { IApplicationState, rootReducer } from "./reducers"
import { rootSaga } from "./sagas"

/* tslint:disable:no-string-literal */
const devTools = global["devToolsExtension"] || (() => (s: IApplicationState) => s)
/* tslint:enable:no-string-literal */

type SagaEnhancedStore<S> = Store<S> & {
  // tslint:disable-next-line:ban-types
  close: Function,
  // tslint:disable-next-line:ban-types
  runSaga: Function,
}

export function configureStore(preloadedState?: IApplicationState): SagaEnhancedStore<IApplicationState> {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [
    routerMiddleware(browserHistory),
    sagaMiddleware,
  ]

  const store = createStore<IApplicationState | undefined>(
    rootReducer,
    preloadedState,
    compose<any, any>(
      applyMiddleware(...middlewares),
      devTools(),
    ),
  ) as SagaEnhancedStore<IApplicationState>

  sagaMiddleware.run(rootSaga)

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  // Hot reload reducers:
  // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
  /* tslint:disable:no-string-literal */
  if (process.env.NODE_ENV === "development" && module["hot"]) {
    module["hot"].accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default
      store.replaceReducer(nextRootReducer)
    })
  }
  /* tslint:enable:no-string-literal */

  return store
}
