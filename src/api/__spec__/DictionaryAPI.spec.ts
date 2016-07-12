import * as expect from "expect";
import * as nock from "nock";
import * as path from "path";
import { readFileSync } from "fs";

import { search, define } from "../DictionaryAPI";
import { IEntry } from "../Entry";

function readFixture(filename: string): any {
  return JSON.parse(readFileSync(path.resolve(__dirname, "fixtures", filename)).toString());
}

describe("Dictionary API", () => {
  describe("search", () => {
    let mockRequest;

    beforeEach(() => {
      mockRequest = nock(/.*/)
        .get("/api/search-json");
    });

    it("returns a list of entries on success", async () => {
      const mockResult = readFixture("search-a.json");

      mockRequest.query({prefix: "a"}).reply(200, mockResult);

      const results = await search("a");
      expect(results.length).toEqual(mockResult.list.length);
    });

    it("returns an error on failure", async () => {
      mockRequest.query({prefix: "error"}).reply(500);

      try {
        await search("error");

      } catch (error) {
        expect(error).toExist();
      }
    });
  });

  describe("define", () => {
    let mockRequest;

    beforeEach(() => {
      mockRequest = nock(/.*/);
    });

    it("returns a single entry on success", async () => {
      const mockResult = readFixture("define-b.json");
      const word = "b";

      mockRequest
        .get("/api/search-json/" + word)
        .reply(200, mockResult);

      const results = await define("b");

      results.forEach((result) => {
        expect(result.word).toEqual(word);
        expect(result.id).toEqual(mockResult.entry["@id"]);
        expect(result.raw).toEqual(mockResult.entry);
      });
    });

    it("returns multiple entries on success", async () => {
      const word = "a";
      const mockResult = readFixture("define-a.json");

      mockRequest
        .get("/api/search-json/" + word)
        .reply(200, mockResult);

      const results = await define("a");

      results.forEach((result, index) => {
        expect(result.word).toEqual(word);
        expect(result.id).toEqual(mockResult.superEntry[index].entry["@id"]);
        expect(result.raw).toEqual(mockResult.superEntry[index].entry);
      });
    });

    it("returns an Not Found error on failure", async () => {
      mockRequest
        .get("/api/search-json/error")
        .reply(404);

      try {
        await define("error");

      } catch (error) {
        expect(error.message.match(/Not Found/)).toExist();
      }
    });
  });
});
