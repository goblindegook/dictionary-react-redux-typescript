import { Action } from "redux-actions"
import { delay } from "redux-saga"
import { call, CallEffect, ForkEffect, put, PutEffect, takeLatest } from "redux-saga/effects"
import { SEARCH_START, searchDone, searchError } from "../actions/search"
import { search } from "../api/DictionaryAPI"
import { IEntry } from "../api/Entry"

export type SearchTaskEffect = CallEffect | PutEffect<any>

export function* searchWorker(action: Action<any>): IterableIterator<SearchTaskEffect> {
  const prefix: string = action.payload

  try {
    let results: IEntry[] = []

    if (prefix && prefix.trim().length) {
      yield call(delay, 200)
      results = yield call(search, prefix)
    }

    yield put(searchDone(results))
  } catch (error) {
    yield put(searchError(error))
  }
}

export function searchSaga(): ForkEffect {
  return takeLatest(SEARCH_START, searchWorker)
}
