import * as expect from "expect";
import * as sinon from "sinon";
import * as nock from "nock";
import * as path from "path";
import { readFileSync } from "fs";

import searchThunk from "../search";
import { searchStart, searchDone, searchError } from "../../actions/search";

describe("Thunk", () => {
  describe("Search", () => {
    let prefix: string;
    let thunk;
    let mockDispatch;
    let mockRequest: nock.Scope;
    let mockResult;

    beforeEach(() => {
      prefix = "a";
      thunk = searchThunk(prefix);
      mockDispatch = sinon.spy();

      mockResult = JSON.parse(
        readFileSync(path.resolve(__dirname, "fixtures", "search-a.json")).toString());

      mockRequest = nock(/.*/)
        .get("/api/search-json")
        .query({prefix});
    });

    it("is a function", () => {
      expect(typeof thunk).toBe("function");
    });

    it("dispatches a SEARCH_START action first", async () => {
      mockRequest.reply(200, mockResult);

      const action = searchStart(prefix);

      await thunk(mockDispatch);

      expect(mockDispatch.firstCall.args[0]).toEqual(action);
    });

    it("dispatches a SEARCH_DONE action on success", async () => {
      mockRequest.reply(200, mockResult);

      await thunk(mockDispatch);

      expect(mockDispatch.secondCall.args[0].type).toBe("SEARCH_DONE");
    });

    it("dispatches a SEARCH_ERROR action on error", async () => {
      mockRequest.reply(500);

      await thunk(mockDispatch);

      expect(mockDispatch.secondCall.args[0].type).toBe("SEARCH_ERROR");
    });
  });

  describe("Search with invalid prefix", () => {
    let mockDispatch;

    beforeEach(() => {
      mockDispatch = sinon.spy();
    });

    it("dispatches a SEARCH_DONE action when empty", async () => {
      const thunk = searchThunk("");

      await thunk(mockDispatch);

      const action: Redux.Action = mockDispatch.secondCall.args[0];
      expect(action.type).toBe("SEARCH_DONE");
    });

    it("dispatches a SEARCH_DONE action when it's whitespace", async () => {
      const thunk = searchThunk(" ");

      await thunk(mockDispatch);

      const action: Redux.Action = mockDispatch.secondCall.args[0];
      expect(action.type).toBe("SEARCH_DONE");
    });
  });
});
