import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { createEntry } from "../../api/Entry";
import EntryDefinition from "../EntryDefinition";

describe("<EntryDefinition />", () => {
  let entry;
  let rawEntry;

  beforeEach(() => {
    rawEntry = {
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

    entry = createEntry("a", "a:1", rawEntry);
  });

  it("renders", () => {
    const wrapper = shallow(<EntryDefinition />);
    expect(wrapper.is("article")).toBe(true);
  });

  it("renders with className", () => {
    const className = "test";
    const wrapper = shallow(<EntryDefinition {...{className}} />);
    expect(wrapper.hasClass(className)).toBe(true);
  });

  it("renders with title", () => {
    const title = "test";
    const wrapper = shallow(<EntryDefinition {...{title}} />);
    expect(wrapper.find(".orth").first().text()).toBe(title);
  });

  it("renders with n", () => {
    const n = 1;
    const wrapper = shallow(<EntryDefinition {...{n}} />);
    expect(wrapper.find(".n").first().text()).toBe(`${n}`);
  });

  it("renders with entry orthography", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".orth").first().text()).toEqual(rawEntry.form.orth);
  });

  it("renders with entry orthography", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".n").first().text()).toEqual(rawEntry["@n"]);
  });

  it("renders with entry pronunciation", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".pron").first().text()).toEqual(rawEntry.form.pron);
  });

  it("renders with entry senses", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".sense").length).toEqual(rawEntry.sense.length);
  });

  xit("renders with entry definitions", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    wrapper.find(".def").forEach((definition) => {
      expect(definition.text()).toEqual(rawEntry.sense[0].def);
    });
  });
});
