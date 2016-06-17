import * as expect from "expect";

import Entry from "../Entry";

describe("Model", () => {
  describe("New entries", () => {
    const entry = new Entry();

    it("should have an ID", () => {
      expect(entry.id).toBe(0);
    });

    it("should have a name", () => {
      expect(entry.name).toBe("");
    });

    it("should have a definition", () => {
      expect(entry.content).toBe("");
    });
  });

  describe("New entries from API data", () => {
    const item = {
      definition: "test",
      id: 1,
      word: "test",
    };

    const entry = new Entry(item);

    it("should have an ID", () => {
      expect(entry.id).toBe(item.id);
    });

    it("should have a name", () => {
      expect(entry.name).toBe(item.word);
    });

    it("should have a definition", () => {
      expect(entry.content).toBe(item.definition);
    });
  });
});
