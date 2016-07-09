import { takeLatest, delay } from "redux-saga";
import { put, call } from "redux-saga/effects";
import { search } from "../api/DictionaryAPI";
import { SEARCH_START, searchDone, searchError } from "../actions/search";

export function* searchTask(action): IterableIterator<any> {
  const prefix: string = action.payload;

  try {
    let results = [];

    if (prefix.trim().length) {
      yield call(delay, 200);
      results = yield call(search, prefix);
    }

    yield put(searchDone(results));
   } catch (e) {
      yield put(searchError(e));
   }
}

export default function* searchSaga() {
  yield* takeLatest(SEARCH_START, searchTask);
}
