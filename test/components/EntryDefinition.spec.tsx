import * as expect from "expect";
import * as React from "react";
import "react-dom";
import { shallow } from "enzyme";
import { createEntry } from "../../src/api/Entry";
import EntryDefinition from "../../src/components/EntryDefinition";

describe("<EntryDefinition />", () => {
  let entry;
  let raw;

  beforeEach(() => {
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

    entry = createEntry("a", "a:1", raw);
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
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".n").first().text()).toBe(raw["@n"]);
  });

  it("renders with entry orthography", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".orth").first().text()).toEqual(raw.form.orth);
  });

  it("renders with entry orthography", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".n").first().text()).toEqual(raw["@n"]);
  });

  it("renders with entry pronunciation", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".pron").first().text()).toEqual(raw.form.pron);
  });

  it("renders with entry senses", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".sense").length).toEqual(raw.sense.length);
  });

  it("renders with entry definitions that contain line breaks", () => {
    const parts = ["foo", "bar", "baz"];
    raw.sense[0].def = parts.join("<br />");
    entry = createEntry("a", "a:1", raw);
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find("br").length).toEqual(parts.length - 1);
  });

  it("renders with entry definitions that contain underscores", () => {
    raw.sense[0].def = "foo _bar_ baz";
    entry = createEntry("a", "a:1", raw);
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find("em").first().text()).toEqual("bar");
  });

  xit("renders with entry definitions", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    wrapper.find(".def").forEach((definition) => {
      expect(definition.text()).toEqual(raw.sense[0].def);
    });
  });
});
