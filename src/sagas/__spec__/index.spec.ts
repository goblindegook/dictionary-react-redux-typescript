import * as expect from "expect";
import sagas from "../index";
import searchSaga from "../search";

describe("Sagas", () => {
  xit("include the search saga", () => {
    const iterator = sagas();
    // TODO: How to test saga composition?
  });
});
