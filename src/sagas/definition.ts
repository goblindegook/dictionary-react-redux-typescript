import { Action } from "redux-actions"
import { takeEvery } from "redux-saga"
import { call, CallEffect, put, PutEffect } from "redux-saga/effects"
import { DEFINITION_START, definitionDone, definitionError } from "../actions/definition"
import { define } from "../api/DictionaryAPI"
import { IEntry } from "../api/Entry"

export type DefinitionTaskEffect = IterableIterator<CallEffect | PutEffect<any>>

export function* definitionWorker(action: Action<string>): DefinitionTaskEffect {
  const id = action.payload

  try {
    const entries: IEntry[] = yield call(define, id)
    yield put(definitionDone(entries))
  } catch (error) {
    yield put(definitionError(error))
  }
}

export function* definitionSaga(): IterableIterator<any> {
  yield takeEvery(DEFINITION_START, definitionWorker)
}
