import * as expect from "expect";

import {
  DEFINITION_START,
  DEFINITION_DONE,
  DEFINITION_ERROR,
  definitionStart,
  definitionDone,
  definitionError,
} from "../../src/actions/definition";

describe("Action", () => {
  describe("Define", () => {
    it("starts a definition lookup", () => {
      const query = "test";
      const action = {
        payload: query,
        type: DEFINITION_START,
      };

      expect(definitionStart(query)).toEqual(action);
    });

    it("completes a definition lookup", () => {
      const results = ["test"];
      const action = {
        payload: results,
        type: DEFINITION_DONE,
      };

      expect(definitionDone(results)).toEqual(action);
    });

    it("completes a definition lookup with error", () => {
      const error = new Error("test");
      const action = {
        error: true,
        payload: error,
        type: DEFINITION_ERROR,
      };

      expect(definitionError(error)).toEqual(action);
    });
  });
});
