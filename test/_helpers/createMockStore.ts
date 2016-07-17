import createSagaMiddleware from "redux-saga";
// import { browserHistory } from "react-router";
// import { routerMiddleware } from "react-router-redux";
import sagas from "../../src/sagas";

/* tslint:disable:no-var-requires */
const configureStore = require("redux-mock-store");
/* tslint:enable:no-var-requires */

export default function createMockStore(state) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    // routerMiddleware(browserHistory),
    sagaMiddleware,
  ];

  const mockStore = configureStore(middlewares);
  const store = mockStore(<any> state);

  sagaMiddleware.run(sagas);

  return store;
}
