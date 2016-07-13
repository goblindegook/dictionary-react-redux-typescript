import * as expect from "expect";
import * as sinon from "sinon";
import { put, call, take, fork } from "redux-saga/effects";
import { delay } from "redux-saga";
import { readFileSync } from "fs";
import { define } from "../../api/DictionaryAPI";
import definitionSaga, { definitionTask } from "../definition";

import {
  DEFINITION_START,
  definitionStart,
  definitionDone,
  definitionError,
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

  describe("worker", () => {
    const conditions = ["success", "error"];

    conditions.forEach((condition) => {
      it(`executes with ${condition}`, () => {
        const id = "a:1";
        const fetchIterator = definitionTask(definitionStart(id));
        let result;

        result = fetchIterator.next();
        expect(result.value).toEqual(call(define, id));
        expect(result.done).toBe(false);

        if (condition === "success") {
          result = fetchIterator.next();
          expect(result.value).toEqual(put(definitionDone()));
          expect(result.done).toBe(false);
        }

        if (condition === "error") {
          const error = new Error();
          result = fetchIterator.throw(error);
          expect(result.value).toEqual(put(definitionError(error)));
          expect(result.done).toBe(false);
        }

        result = fetchIterator.next();
        expect(result.done).toBe(true);
      });
    });
  });
});
