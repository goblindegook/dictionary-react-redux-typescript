import createSagaMiddleware from "redux-saga";
import sagas from "../../sagas";
const configureStore = require("redux-mock-store");

export default function createMockStore(state) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
  ];

  const mockStore = configureStore(middlewares);
  const store = mockStore(state);

  sagaMiddleware.run(sagas);

  return store;
}
