import * as expect from "expect";
import * as sinon from "sinon";

import doSearch from "../search";
import { searchStart, searchDone, searchError } from "../../actions/search";

describe("Thunks", () => {
  describe("Search", () => {
    let query;
    let thunk;
    let mockDispatch;

    beforeEach(() => {
      query = "test";
      thunk = doSearch(query);
      mockDispatch = sinon.spy();
    });

    it("should be a function", () => {
      expect(typeof thunk).toBe("function");
    });

    it("should dispatch a SEARCH_START action", () => {
      const action = searchStart(query);
      return thunk(mockDispatch)
        .then(() => {
          expect(mockDispatch.getCall(0).args[0]).toEqual(action);
        });
    });

    xit("should dispatch a SEARCH_DONE action on success", () => {
      // TODO: nock success
      // TODO: create matching success action
      return thunk(mockDispatch)
        .then((promise) => {
          expect(mockDispatch.getCall(1).args[0]).toBe({});
        });
    });

    xit("should dispatch a SEARCH_ERROR action on error", () => {
      // TODO: nock error
      // TODO: create matching error action
      return thunk(mockDispatch)
        .then((promise) => {
          expect(mockDispatch.getCall(1).args[0]).toBe({});
        });
    });
  });
});
