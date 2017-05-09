import { Action } from "redux-actions"
import { call, CallEffect, ForkEffect, put, PutEffect, takeEvery } from "redux-saga/effects"
import { DEFINITION_START, definitionDone, definitionError } from "../actions/definition"
import { define } from "../api/DictionaryAPI"
import { IEntry } from "../api/Entry"

export type DefinitionTaskEffect = CallEffect | PutEffect<any>

export function* definitionWorker(action: Action<string>): IterableIterator<DefinitionTaskEffect> {
  const id = action.payload

  try {
    const entries: IEntry[] = yield call(define, id)
    yield put(definitionDone(entries))
  } catch (error) {
    yield put(definitionError(error))
  }
}

export function definitionSaga(): ForkEffect {
  return takeEvery(DEFINITION_START, definitionWorker)
}
