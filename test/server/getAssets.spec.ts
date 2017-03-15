import * as expect from "expect"
import { getAssets } from "../../src/server/getAssets"

describe("getAssets", () => {
  xit("fetches the Webpack asset manifest", () => {
    const manifest = { test: "test" }
    expect(getAssets()).toEqual(manifest)
  })
})
