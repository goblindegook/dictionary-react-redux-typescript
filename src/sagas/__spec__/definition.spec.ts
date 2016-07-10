import * as expect from "expect";
import * as sinon from "sinon";
import { put, call, take, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { readFileSync } from "fs";

import { define } from "../../api/DictionaryAPI";
import definitionSaga, { definitionTask } from "../definition";

import {
  DEFINITION_START,
  DEFINITION_DONE,
  DEFINITION_ERROR,
  definitionStart,
  definitionDone,
  definitionError
} from "../../actions/definition";

describe("Definition saga", () => {
  const sagaIterator = definitionSaga();

  it("is started by a DEFINITION_START action", () => {
    const result = sagaIterator.next();
    expect(result.value).toEqual(take(DEFINITION_START));
    expect(result.done).toBe(false);
  });

  it("forks a fetch result function generator", () => {
    const result = sagaIterator.next();
    expect(result.value).toEqual(fork(definitionTask, undefined));
    expect(result.done).toBe(false);
  });
});

describe("Search saga worker", () => {
  const conditions = ["success", "error"];

  conditions.forEach((condition) => {
    describe(`with ${condition}`, () => {
      const id = "a:1";
      const fetchIterator = definitionTask(definitionStart(id));

      it("calls a remote API definition fetch", () => {
        const result = fetchIterator.next();
        expect(result.value).toEqual(call(define, id));
        expect(result.done).toBe(false);
      });

      if (condition === "success") {
        it("yields a DEFINITION_DONE action", () => {
          const result = fetchIterator.next();
          expect(result.value).toEqual(put(definitionDone()));
          expect(result.done).toBe(false);
        });
      }

      if (condition === "error") {
        it("yields a DEFINITION_ERROR action", () => {
          const error = new Error();
          const result = fetchIterator.throw(error);
          expect(result.value).toEqual(put(definitionError(error)));
          expect(result.done).toBe(false);
        });
      }

      it("is done", () => {
        const result = fetchIterator.next();
        expect(result.done).toBe(true);
      });
    });
  });
});
