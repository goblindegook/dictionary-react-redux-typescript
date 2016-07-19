import * as expect from "expect";
import { createEntry } from "../../src/api/Entry";

/* tslint:disable:no-var-requires */
const defineFixture = require("./fixtures/define-a.json");
/* tslint:enable:no-var-requires */

describe("Entry factory", () => {
  context("when creating an entry from word", () => {
    const word = "word";
    const entry = createEntry(word);

    it("sets an ID equal to word", () => {
      expect(entry.id).toBe(word);
    });

    it("sets the word", () => {
      expect(entry.word).toBe(word);
    });

    it("sets no senses", () => {
      expect(entry.senses).toEqual([]);
    });
  });

  context("when creating an entry from null data", () => {
    let id;
    let word;
    let entry;

    before(() => {
      id = "a:1";
      word = "a";
      entry = createEntry(word, id, null);
    });

    it("sets the orthography", () => {
      expect(entry.spelling).toBe(word);
    });

    it("sets the entry ID", () => {
      expect(entry.id).toBe(id);
    });
  });

  context("when creating an entry from raw data", () => {
    let raw;
    let entry;
    let id;
    let word;

    beforeEach(() => {
      word = "a";
      id = "a:1";
      raw = defineFixture.superEntry[0].entry;
      entry = createEntry(word, id, raw);
    });

    it("sets the ID", () => {
      expect(entry.id).toBe(id);
    });

    it("sets the word", () => {
      expect(entry.word).toBe(word);
    });

    it("sets the raw content", () => {
      expect(entry.raw).toEqual(raw);
    });

    it("sets the etymology", () => {
      raw = defineFixture.superEntry[1].entry;
      entry = createEntry(word, id, raw);
      expect(entry.etymology).toBe(raw.etym["#text"]);
    });

    it("sets the orthography", () => {
      expect(entry.spelling).toBe(raw.form.orth);
    });

    it("sets the pronunciation", () => {
      expect(entry.pronunciation).toBe(raw.form.pron);
    });

    it("sets the index", () => {
      expect(entry.index).toBe(parseInt(raw["@n"], 10));
    });

    it("sets the ID", () => {
      expect(entry.id).toBe(raw["@id"]);
    });

    it("sets senses", () => {
      expect(entry.senses.length).toEqual(raw.sense.length);
    });

    it("sets sense definitions", () => {
      entry.senses.forEach((sense, i) => {
        expect(sense.definition).toEqual(raw.sense[i].def);
      });
    });

    it("sets sense grammar groups", () => {
      entry.senses.forEach((sense, i) => {
        expect(sense.grammarGroup).toEqual(raw.sense[i].gramGrp);
      });
    });

    it("sets sense usages", () => {
      entry.senses.forEach((sense, i) => {
        expect(sense.usage).toEqual(raw.sense[i].usg && raw.sense[i].usg["#text"]);
      });
    });
  });
});
