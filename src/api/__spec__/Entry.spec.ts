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
      word = "a";
      id = "a:1";
      content = {
        "@n": "1",
        "@id": "a:1",
        "@type": "hom",
        "form": {
          "orth": "A",
          "pron": "á"
        },
        "sense": [
          {
            "gramGrp": "m.",
            "def": "Primeira letra do alfabeto português."
          },
          {
            "@ast": "1",
            "usg": {
              "@type": "dom",
              "#text": "Mús."
            },
            "def": "Primeira nota da escala na denominação alfabética dos sons."
          },
          {
            "gramGrp": "Adj.",
            "def": "Primeiro, (falando-se de um número ou de um objecto que faz parte de uma série)."
          },
          {
            "@ast": "1",
            "gramGrp": "Adj.",
            "def": "Que é de primeira classe, (falando-se de carruagens de caminho de ferro)."
          }
        ]
      };

      entry = createEntry(word, id, content);
    });

    it("has an ID", () => {
      expect(entry.id).toBe(id);
    });

    it("has a word", () => {
      expect(entry.word).toBe(word);
    });

    it("has content", () => {
      expect(entry.content).toEqual(content);
    });
  });
});
