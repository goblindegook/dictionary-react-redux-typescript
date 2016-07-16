import * as expect from "expect";

import configureStore from "../store";

describe("Store", () => {
  describe("configureStore", () => {
    let store;

    beforeEach(() => {
      store = configureStore();
    });

    it("has an initial state", () => {
      expect(store.getState()).toExist();
    });

    it("has a custom initial state", () => {
      const state = {
        definition: "definition",
        routing: {
          locationBeforeTransitions: [ null ],
        },
        search: "search"
      };

      store = configureStore(state);

      expect(store.getState()).toEqual(state);
    });

    xit("applies middlewares", () => {
      // TODO
    });
  });
});
