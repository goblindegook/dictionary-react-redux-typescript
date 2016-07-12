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

    it("has no sense", () => {
      expect(entry.senses).toEqual([]);
    });
  });

  describe("New entry from complete data", () => {
    let raw;
    let entry;
    let id;
    let word;

    beforeEach(() => {
      word = "a";
      id = "a:1";
      raw = {
        "@n": "1",
        "@id": "a:1",
        "@type": "hom",
        etym: {
          "@orig": "a",
          "#text": "a",
        },
        form: {
          orth: "A",
          pron: "á",
        },
        sense: [
          {
            def: "Primeira letra do alfabeto português.",
            gramGrp: "m.",
          },
          {
            "@ast": "1",
            def: "Primeira nota da escala na denominação alfabética dos sons.",
            usg: {
              "@type": "dom",
              "#text": "Mús.",
            },
          },
          {
            def: "Primeiro, (falando-se de um número ou de um objecto que faz parte de uma série).",
            gramGrp: "Adj.",
          },
          {
            "@ast": "1",
            def: "Que é de primeira classe, (falando-se de carruagens de caminho de ferro).",
            gramGrp: "Adj.",
          },
        ],
      };

      entry = createEntry(word, id, raw);
    });

    it("has an ID", () => {
      expect(entry.id).toBe(id);
    });

    it("has a word", () => {
      expect(entry.word).toBe(word);
    });

    it("has raw content", () => {
      expect(entry.raw).toEqual(raw);
    });

    it("returns etymology", () => {
      expect(entry.etymology).toBe(raw.etym["#text"]);
    });

    it("returns orthography", () => {
      expect(entry.spelling).toBe(raw.form.orth);
    });

    it("returns orthography on null entry", () => {
      entry = createEntry(word, id, null);
      expect(entry.spelling).toBe(word);
    });

    it("returns pronunciation", () => {
      expect(entry.pronunciation).toBe(raw.form.pron);
    });

    it("returns the entry index", () => {
      expect(entry.index).toBe(parseInt(raw["@n"], 10));
    });

    it("returns the entry ID", () => {
      expect(entry.id).toBe(raw["@id"]);
    });

    it("returns the entry ID on null entry", () => {
      entry = createEntry(word, id, null);
      expect(entry.id).toBe(id);
    });

    it("returns senses", () => {
      expect(entry.senses.length).toEqual(raw.sense.length);
    });

    it("returns sense definitions", () => {
      entry.senses.forEach((sense, i) => {
        expect(sense.definition).toEqual(raw.sense[i].def);
      });
    });

    it("returns sense grammar groups", () => {
      entry.senses.forEach((sense, i) => {
        expect(sense.grammarGroup).toEqual(raw.sense[i].gramGrp);
      });
    });

    it("returns sense usages", () => {
      entry.senses.forEach((sense, i) => {
        expect(sense.usage).toEqual(raw.sense[i].usg && raw.sense[i].usg["#text"]);
      });
    });
  });
});
