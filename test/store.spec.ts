import * as expect from "expect"
import { IApplicationState } from "../src/reducers"
import { configureStore } from "../src/store"

describe("Store", () => {
  describe("configureStore", () => {
    it("has an initial state", () => {
      const store = configureStore()
      expect(store.getState()).toExist()
    })

    it("has a custom initial state", () => {
      const state: IApplicationState = {
        definition: {},
        routing: {
          locationBeforeTransitions: [ null ],
        },
        search: {},
      }

      const store = configureStore(state)

      expect(store.getState()).toEqual(state)
    })

    xit("applies middlewares", () => {
      // TODO
    })
  })
})
