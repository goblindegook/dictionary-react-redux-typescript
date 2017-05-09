import createSagaMiddleware from "redux-saga"
import { IApplicationState } from "../../src/reducers"
import { rootSaga } from "../../src/sagas"

/* tslint:disable:no-var-requires */
const configureStore = require("redux-mock-store").default
/* tslint:enable:no-var-requires */

export function createMockStore(state: IApplicationState): any {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [
    sagaMiddleware,
  ]

  const mockStore = configureStore(middlewares)
  const store = mockStore(state)

  sagaMiddleware.run(rootSaga)

  return store
}
