import * as expect from "expect";

import { createEntry } from "../Entry";

describe("Entry creator", () => {
  describe("New entry from word", () => {
    const word = "word";
    const entry = createEntry(word);

    it("has an ID equal to word", () => {
      expect(entry.id).toBe(word);
    });

    it("has a word", () => {
      expect(entry.word).toBe(word);
    });

    it("has undefined content", () => {
      expect(entry.content).toBe(undefined);
    });
  });

  describe("New entry from complete data", () => {
    let content;
    let entry;
    let id;
    let word;

    before(() => {
      content = { anything: "anything" };
      id = "test:1";
      word = "test";

      entry = createEntry(word, id, content);
    });

    it("has an ID", () => {
      expect(entry.id).toBe(id);
    });

    it("has a word", () => {
      expect(entry.word).toBe(word);
    });

    it("has content", () => {
      expect(entry.content).toBe(content);
    });
  });
});
