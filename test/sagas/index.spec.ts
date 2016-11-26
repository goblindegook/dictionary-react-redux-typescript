import * as expect from "expect"
import { rootSaga } from "../../src/sagas"

describe("Sagas", () => {
  xit("include the search saga", () => {
    const iterator = rootSaga()
    expect(iterator).toExist()
    // TODO: How to test saga composition?
  })
})
