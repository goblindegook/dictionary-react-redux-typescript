import * as expect from "expect";
import * as nock from "nock";
import { search, define } from "../../src/api/DictionaryAPI";

describe("Dictionary API", () => {
  describe("search", () => {
    let mockRequest;

    beforeEach(() => {
      mockRequest = nock(/.*/)
        .get("/api/search-json");
    });

    it("returns a list of entries on success", async () => {
      /* tslint:disable:no-var-requires */
      const mockResult = require("./fixtures/search-a.json");
      /* tslint:enable:no-var-requires */

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
      /* tslint:disable:no-var-requires */
      const mockResult = require("./fixtures/define-b.json");
      /* tslint:enable:no-var-requires */
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
      /* tslint:disable:no-var-requires */
      const mockResult = require("./fixtures/define-a.json");
      /* tslint:enable:no-var-requires */

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
