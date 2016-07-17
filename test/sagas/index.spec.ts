import * as expect from "expect";
import sagas from "../../src/sagas";

describe("Sagas", () => {
  xit("include the search saga", () => {
    const iterator = sagas();
    expect(iterator).toExist();
    // TODO: How to test saga composition?
  });
});
