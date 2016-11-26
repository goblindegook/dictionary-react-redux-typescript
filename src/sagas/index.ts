import { definitionSaga } from "./definition"
import { searchSaga } from "./search"

export function* rootSaga(): IterableIterator<any> {
  yield [
    definitionSaga(),
    searchSaga(),
  ]
}
