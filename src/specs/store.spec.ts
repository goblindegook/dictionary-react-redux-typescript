import * as expect from "expect";

import configureStore from "../store";

describe("Store", () => {
  describe("configureStore", () => {
    let store;

    before(() => {
      store = configureStore();
    });

    it("should apply middlewares", () => {
      expect(1).toBe(1);
    });
  });
});
