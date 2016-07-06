import * as expect from "expect";

import { searchStart, searchDone, searchError } from "../../actions/search";
import { createEntry } from "../../api/Entry";
import searchReducer from "../search";

describe("Reducers", () => {
  describe("Search", () => {
    const error = new Error("test");
    const prefix = "test";
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
      initialState.prefix = prefix;
      const action = searchStart(prefix);
      const actualState = searchReducer(initialState, action);

      expect(actualState).toNotBe(initialState);
      expect(actualState.isLoading).toBe(true);
      expect(actualState.prefix).toBe(prefix);
    });

    it("handles SEARCH_DONE actions", () => {
      initialState.prefix = prefix;
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
      expect(actualState.prefix).toBe(prefix);
    });

    it("handles SEARCH_ERROR actions", () => {
      initialState.prefix = prefix;
      const action = searchError(error);
      const actualState = searchReducer(initialState, action);

      expect(actualState).toNotBe(initialState);
      expect(actualState.isLoading).toBe(false);
      expect(actualState.entries).toEqual([]);
      expect(actualState.prefix).toBe(prefix);
    });
  });
});
