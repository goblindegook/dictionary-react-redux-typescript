import * as expect from "expect";

import configureStore from "../store";

describe("Store", () => {
  describe("configureStore", () => {
    let store;

    before(() => {
      store = configureStore();
    });

    xit("applies middlewares", () => {
      // TODO
    });
  });
});
