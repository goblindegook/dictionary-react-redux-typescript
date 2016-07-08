import * as expect from "expect";
import * as sinon from "sinon";
import { put, call, take, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { readFileSync } from "fs";

import { search } from "../../api/DictionaryAPI";
import searchSaga, { fetchSearchResults } from "../search";

import {
  SEARCH_START,
  SEARCH_DONE,
  SEARCH_ERROR,
  searchStart,
  searchDone,
  searchError
} from "../../actions/search";

describe("Search saga", () => {
  const sagaIterator = searchSaga();

  it("is started by a SEARCH_START action", () => {
    const result = sagaIterator.next();
    expect(result.value).toEqual(take(SEARCH_START));
    expect(result.done).toBe(false);
  });

  it("forks a fetch result function generator", () => {
    const result = sagaIterator.next();
    expect(result.value).toEqual(fork(fetchSearchResults, undefined));
    expect(result.done).toBe(false);
  });

  const conditions = ["success", "error"];

  conditions.forEach((condition) => {
    describe(`with ${condition}`, () => {
      const prefix = "a";
      const fetchIterator = fetchSearchResults(searchStart(prefix));

      it("has a 200 ms delay", () => {
        const result = fetchIterator.next();
        expect(result.value).toEqual(call(delay, 200));
        expect(result.done).toBe(false);
      });

      it("searches the API", () => {
        const result = fetchIterator.next();
        expect(result.value).toEqual(call(search, prefix));
        expect(result.done).toBe(false);
      });

      if (condition === "success") {
        it("dispatches a SEARCH_DONE action", () => {
          const result = fetchIterator.next();
          expect(result.value).toEqual(put(searchDone()));
          expect(result.done).toBe(false);
        });
      }

      if (condition === "error") {
        it("dispatches a SEARCH_ERROR action", () => {
          const error = new Error();
          const result = fetchIterator.throw(error);
          expect(result.value).toEqual(put(searchError(error)));
          expect(result.done).toBe(false);
        });
      }

      it("is done", () => {
        const result = fetchIterator.next();
        expect(result.done).toBe(true);
      });
    });
  });

  const prefixes = ["", " "];

  prefixes.forEach((prefix) => {
    describe(`with a "${prefix}" prefix`, () => {
      const sagaIterator = searchSaga();
      const fetchIterator = fetchSearchResults(searchStart(prefix));

      it("is started by a SEARCH_START action", () => {
        const result = sagaIterator.next();
        expect(result.value).toEqual(take(SEARCH_START));
        expect(result.done).toBe(false);
      });

      it("dispatches a SEARCH_DONE action", () => {
        const result = fetchIterator.next();
        expect(result.value).toEqual(put(searchDone([])));
        expect(result.done).toBe(false);
      });

      it("is done", () => {
        const result = fetchIterator.next();
        expect(result.done).toBe(true);
      });
    });
  });
});
