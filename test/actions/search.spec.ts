import * as expect from "expect"
import { createEntry } from "../../src/api/Entry"

import {
  SEARCH_DONE,
  SEARCH_ERROR,
  SEARCH_START,
  searchDone,
  searchError,
  searchStart,
} from "../../src/actions/search"

describe("Action", () => {
  describe("Search", () => {
    it("starts a search", () => {
      const query = "test"
      const action = {
        payload: query,
        type: SEARCH_START,
      }

      expect(searchStart(query)).toEqual(action)
    })

    it("completes a search", () => {
      const results = [createEntry("test")]
      const action = {
        payload: results,
        type: SEARCH_DONE,
      }

      expect(searchDone(results)).toEqual(action)
    })

    it("completes a search with error", () => {
      const error = new Error("test")
      const action = {
        error: true,
        payload: error,
        type: SEARCH_ERROR,
      }

      expect(searchError(error)).toEqual(action)
    })
  })
})
