import * as expect from "expect";
// import * as nock from "nock";

import { search, define } from "../DictionaryAPI";
import Entry from "../Entry";

describe("Dictionary API", () => {
  describe("define", () => {
    it("should return a single entry", () => {
      new Promise(() => define("test"))
        .then((result: Entry) => {
          expect(result.name).toBe("test");
        });
    });
  });

  describe("search", () => {
    it("should return a list of entries", () => {
      new Promise(() => search("test"))
        .then((results: Entry[]) => {
          expect(results.length).toNotEqual(0);
        });
    });
  });
});
