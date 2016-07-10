import { takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { define } from "../api/DictionaryAPI";
import { DEFINITION_START, definitionDone, definitionError } from "../actions/definition";

export function* definitionTask(action): IterableIterator<any> {
  const id: string = action.payload;

  try {
    const results = yield call(define, id);
    yield put(definitionDone(results));
   } catch (e) {
      yield put(definitionError(e));
   }
}

export default function* definitionSaga() {
  yield* takeEvery(DEFINITION_START, definitionTask);
}
