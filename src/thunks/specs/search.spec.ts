import * as expect from "expect";
import * as sinon from "sinon";
import * as nock from "nock";
import * as path from "path";
import { readFileSync } from "fs";

import doSearch from "../search";
import { searchStart, searchDone, searchError } from "../../actions/search";

describe("Thunk", () => {
  describe("Search", () => {
    let prefix;
    let thunk;
    let mockDispatch;
    let mockAPI;
    let mockResult;

    beforeEach(() => {
      prefix = "a";
      thunk = doSearch(prefix);
      mockDispatch = sinon.spy();
      mockAPI = nock("http://dicionario-aberto.net");
      mockResult = JSON.parse(
        readFileSync(path.resolve(__dirname, "fixtures", "search-a.json")).toString());
    });

    it("is a function", () => {
      expect(typeof thunk).toBe("function");
    });

    it("dispatches a SEARCH_START action first", () => {
      mockAPI
        .get("/search-json")
        .query({prefix: "a"})
        .reply(200, mockResult);

      const action = searchStart(prefix);

      return thunk(mockDispatch)
        .then(() => {
          expect(mockDispatch.firstCall.args[0]).toEqual(action);
        });
    });

    it("dispatches a SEARCH_DONE action on success", () => {
      mockAPI
        .get("/search-json")
        .query({prefix: "a"})
        .reply(200, mockResult);

      return thunk(mockDispatch)
        .then((promise) => {
          expect(mockDispatch.secondCall.args[0].type).toBe("SEARCH_DONE");
        });
    });

    it("dispatches a SEARCH_ERROR action on error", () => {
      mockAPI
        .get("/search-json")
        .query({prefix: "a"})
        .reply(500);

      return thunk(mockDispatch)
        .then((promise) => {
          expect(mockDispatch.secondCall.args[0].type).toBe("SEARCH_ERROR");
        });
    });
  });
});
