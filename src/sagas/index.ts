import { Action } from "redux-actions"
import { definitionSaga } from "./definition"
import { searchSaga } from "./search"

export type Preloader<T, R> = [(action: Action<T>) => R, Action<T>]

export function* rootSaga(): IterableIterator<any> {
  yield [
    definitionSaga(),
    searchSaga(),
  ]
}
