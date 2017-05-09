import { Action } from "redux-actions"
import { all } from "redux-saga/effects"
import { definitionSaga } from "./definition"
import { searchSaga } from "./search"

export type Preloader<R, T> = [(action: Action<T>) => IterableIterator<R>, Action<T>]

export function* rootSaga(): IterableIterator<any> {
  yield all([
    definitionSaga(),
    searchSaga(),
  ])
}
