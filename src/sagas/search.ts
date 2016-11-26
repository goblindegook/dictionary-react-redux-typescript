import { Action } from "redux-actions"
import { delay, takeLatest } from "redux-saga"
import { call, CallEffect, put, PutEffect } from "redux-saga/effects"
import { SEARCH_START, searchDone, searchError } from "../actions/search"
import { search } from "../api/DictionaryAPI"
import { IEntry } from "../api/Entry"

export function* searchTask(action: Action<any>): IterableIterator<CallEffect | PutEffect<any>> {
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

export function* searchSaga() {
  yield* takeLatest(SEARCH_START, searchTask)
}
