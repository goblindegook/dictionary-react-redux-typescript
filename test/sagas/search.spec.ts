import * as expect from "expect";
import { put, call, take, fork } from "redux-saga/effects";
import { delay } from "redux-saga";
import { search } from "../../src/api/DictionaryAPI";
import searchSaga, { searchTask } from "../../src/sagas/search";

import {
  SEARCH_START,
  searchStart,
  searchDone,
  searchError,
} from "../../src/actions/search";

describe("Search saga", () => {
  const sagaIterator = searchSaga();

  it("is started by a SEARCH_START action", () => {
    const result = sagaIterator.next();
    expect(result.value).toEqual(take(SEARCH_START));
    expect(result.done).toBe(false);
  });

  it("forks a fetch result function generator", () => {
    const result = sagaIterator.next();
    expect(result.value).toEqual(fork(searchTask, undefined));
    expect(result.done).toBe(false);
  });

  describe("worker", () => {
    const conditions = ["success", "error"];

    conditions.forEach((condition) => {
      it(`executes with ${condition}`, () => {
        const prefix = "a";
        const fetchIterator = searchTask(searchStart(prefix));
        let result;

        result = fetchIterator.next();
        expect(result.value).toEqual(call(delay, 200));
        expect(result.done).toBe(false);

        result = fetchIterator.next();
        expect(result.value).toEqual(call(search, prefix));
        expect(result.done).toBe(false);

        if (condition === "success") {
          result = fetchIterator.next();
          expect(result.value).toEqual(put(searchDone()));
          expect(result.done).toBe(false);
        }

        if (condition === "error") {
          const error = new Error();
          result = fetchIterator.throw(error);
          expect(result.value).toEqual(put(searchError(error)));
          expect(result.done).toBe(false);
        }

        result = fetchIterator.next();
        expect(result.done).toBe(true);
      });
    });

    const prefixes = ["", " "];

    prefixes.forEach((prefix) => {
      it(`executes with a "${prefix}" prefix`, () => {
        const fetchIterator = searchTask(searchStart(prefix));
        let result;

        result = fetchIterator.next();
        expect(result.value).toEqual(put(searchDone([])));
        expect(result.done).toBe(false);

        result = fetchIterator.next();
        expect(result.done).toBe(true);
      });
    });
  });
});
