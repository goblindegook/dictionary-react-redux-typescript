import * as expect from "expect";

import {
  SEARCH_START,
  SEARCH_DONE,
  SEARCH_ERROR,
  searchStart,
  searchDone,
  searchError
} from "../search";

describe("Action", () => {
  describe("Search", () => {
    it("starts a search", () => {
      const query = "test";
      const action = {
        payload: query,
        type: SEARCH_START,
      };

      expect(searchStart(query)).toEqual(action);
    });

    it("completes a search", () => {
      const results = ["test"];
      const action = {
        payload: results,
        type: SEARCH_DONE,
      };

      expect(searchDone(results)).toEqual(action);
    });

    it("completes a search with error", () => {
      const error = new Error("test");
      const action = {
        error: true,
        payload: error,
        type: SEARCH_ERROR,
      };

      expect(searchError(error)).toEqual(action);
    });
  });
});
