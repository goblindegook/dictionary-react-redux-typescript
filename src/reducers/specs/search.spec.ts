import * as expect from "expect";

import { searchStart, searchDone, searchError } from "../../actions/search";
import { createEntry } from "../../api/Entry";
import searchReducer from "../search";

describe("Reducers", () => {
  describe("Search", () => {
    let initialState;

    beforeEach(() => {
      initialState = {
        entries: [],
        isLoading: false,
        prefix: "",
      };
    });

    it("provides an initial state", () => {
      const action = { type: "" };
      expect(searchReducer(undefined, action)).toEqual(initialState);
    });

    it("handles SEARCH_START actions", () => {
      const prefix = "test";
      const action = searchStart(prefix);
      const actualState = searchReducer(initialState, action);

      expect(actualState).toNotBe(initialState);
      expect(actualState.isLoading).toBe(true);
      expect(actualState.prefix).toBe(prefix);
    });

    it("handles SEARCH_DONE actions", () => {
      const entries = [
        createEntry("one", "one", "one"),
        createEntry("two", "two", "two"),
        createEntry("three", "three", "three"),
      ];
      const action = searchDone(entries);
      const actualState = searchReducer(initialState, action);

      expect(actualState).toNotBe(initialState);
      expect(actualState.isLoading).toBe(false);
      expect(actualState.entries).toEqual(entries);
    });

    it("handles SEARCH_ERROR actions", () => {
      const error = new Error("test");
      const action = searchError(error);
      const actualState = searchReducer(initialState, action);

      expect(actualState).toNotBe(initialState);
      expect(actualState.isLoading).toBe(false);
      expect(actualState.entries).toEqual([]);
    });
  });
});
