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

    it("has no senses", () => {
      expect(entry.getSenses()).toEqual([]);
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

    it("returns orthography", () => {
      const orth = entry.getOrthography();
      expect(orth).toBe(raw.form.orth);
    });

    it("returns orthography on null entry", () => {
      entry = createEntry(word, id, null);
      const nullOrth = entry.getOrthography();
      expect(nullOrth).toBe(word);
    });

    it("returns pronunciation", () => {
      const pron = entry.getPronunciation();
      expect(pron).toBe(raw.form.pron);
    });

    it("returns the entry index", () => {
      const n = entry.getIndex();
      expect(n).toBe(parseInt(raw["@n"], 10));
    });

    it("returns the entry ID", () => {
      id = entry.getId();
      expect(id).toBe(raw["@id"]);
    });

    it("returns the entry ID on null entry", () => {
      entry = createEntry(word, id, null);
      const nullId = entry.getId();
      expect(nullId).toBe(id);
    });

    it("returns senses", () => {
      const senses = entry.getSenses();
      senses.forEach((sense, i) => {
        expect(sense).toEqual(raw.sense[i]);
      });
    });
  });
});
