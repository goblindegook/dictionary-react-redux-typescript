import * as expect from "expect";

import { searchStart, searchDone, searchError } from "../search";

describe("Actions", () => {
  describe("Search", () => {
    it("should create search start actions", () => {
      const query = "test";
      const action = {
        payload: query,
        type: "SEARCH_START",
      };

      expect(searchStart(query)).toEqual(action);
    });

    it("should complete a search", () => {
      const results = ["test"];
      const action = {
        payload: results,
        type: "SEARCH_DONE",
      };

      expect(searchDone(results)).toEqual(action);
    });

    it("should complete a search with an error", () => {
      const error = new Error("test");
      const action = {
        error: true,
        payload: error,
        type: "SEARCH_ERROR",
      };

      expect(searchError(error)).toEqual(action);
    });
  });
});
