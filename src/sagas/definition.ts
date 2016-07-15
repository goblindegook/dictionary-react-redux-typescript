import { takeEvery } from "redux-saga";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { define } from "../api/DictionaryAPI";
import { DEFINITION_START, definitionDone, definitionError } from "../actions/definition";

export function* definitionTask(action): IterableIterator<CallEffect | PutEffect<any>> {
  const id: string = action.payload;

  try {
    const entries = yield call(define, id);
    yield put(definitionDone(entries));
  } catch (error) {
    yield put(definitionError(error));
  }
}

export default function* definitionSaga() {
  yield* takeEvery(DEFINITION_START, definitionTask);
}
