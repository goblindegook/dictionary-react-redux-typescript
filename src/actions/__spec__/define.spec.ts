import * as expect from "expect";

import {
  DEFINE_START,
  DEFINE_DONE,
  DEFINE_ERROR,
  defineStart,
  defineDone,
  defineError
} from "../define";

describe("Action", () => {
  describe("Define", () => {
    it("starts a definition lookup", () => {
      const query = "test";
      const action = {
        payload: query,
        type: DEFINE_START,
      };

      expect(defineStart(query)).toEqual(action);
    });

    it("completes a definition lookup", () => {
      const results = ["test"];
      const action = {
        payload: results,
        type: DEFINE_DONE,
      };

      expect(defineDone(results)).toEqual(action);
    });

    it("completes a definition lookup with error", () => {
      const error = new Error("test");
      const action = {
        error: true,
        payload: error,
        type: DEFINE_ERROR,
      };

      expect(defineError(error)).toEqual(action);
    });
  });
});
