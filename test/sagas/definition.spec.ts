import * as expect from "expect"
import { call, CallEffect, fork, put, PutEffect, take } from "redux-saga/effects"
import { define } from "../../src/api/DictionaryAPI"
import { definitionSaga, definitionWorker } from "../../src/sagas/definition"

import {
  DEFINITION_START,
  definitionDone,
  definitionError,
  definitionStart,
} from "../../src/actions/definition"

describe("Definition saga", () => {
  const sagaIterator = definitionSaga()

  it("is started by a DEFINITION_START action", () => {
    const result = sagaIterator.next()
    expect(result.value).toEqual(take(DEFINITION_START))
    expect(result.done).toBe(false)
  })

  it("forks a fetch result function generator", () => {
    const result = sagaIterator.next()
    expect(result.value).toEqual(fork(definitionWorker, undefined))
    expect(result.done).toBe(false)
  })

  describe("worker", () => {
    const conditions = ["success", "error"]

    conditions.forEach((condition) => {
      it(`executes with ${condition}`, () => {
        const id = "a:1"
        const fetchIterator = definitionWorker(definitionStart(id))
        let result: IteratorResult<CallEffect | PutEffect<any>>

        result = fetchIterator.next()
        expect(result.value).toEqual(call(define, id))
        expect(result.done).toBe(false)

        if (condition === "success") {
          result = fetchIterator.next()
          expect(result.value).toEqual(put(definitionDone()))
          expect(result.done).toBe(false)
        }

        if (condition === "error") {
          const error = new Error()
          result = fetchIterator.throw!(error)
          expect(result.value).toEqual(put(definitionError(error)))
          expect(result.done).toBe(false)
        }

        result = fetchIterator.next()
        expect(result.done).toBe(true)
      })
    })
  })
})
