import * as expect from "expect";
import * as React from "react";
import "react-dom";
import { shallow } from "enzyme";
import { cloneDeep } from "lodash";
import { createEntry } from "../../src/api/Entry";
import EntryDefinition from "../../src/components/EntryDefinition";

/* tslint:disable:no-var-requires */
const defineAFixture = require("./fixtures/define-a.json");
/* tslint:enable:no-var-requires */

describe("<EntryDefinition />", () => {
  let entry;
  let data;

  beforeEach(() => {
    data = cloneDeep(defineAFixture.superEntry[0].entry);
    entry = createEntry("a", "a:1", data);
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

  it("renders title", () => {
    const title = "test";
    const wrapper = shallow(<EntryDefinition {...{title}} />);
    expect(wrapper.find(".orth").first().text()).toBe(title);
  });

  it("renders entry index (n)", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".n").first().text()).toBe(data["@n"]);
  });

  it("renders entry orthography", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".orth").first().text()).toEqual(data.form.orth);
  });

  it("renders entry pronunciation", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".pron").first().text()).toEqual(data.form.pron);
  });

  it("renders entry senses", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    expect(wrapper.find(".sense").length).toEqual(data.sense.length);
  });

  it("renders entry definitions", () => {
    const wrapper = shallow(<EntryDefinition {...{entry}} />);
    let i = 0;
    wrapper.find(".def").forEach(def => expect(def.text()).toEqual(data.sense[i++].def));
  });

  context("when rendering definitions", () => {
    it("converts line breaks", () => {
      const parts = ["foo", "bar", "baz"];
      data.sense[0].def = parts.join("<br />");
      entry = createEntry("a", "a:1", data);
      const wrapper = shallow(<EntryDefinition {...{entry}} />);
      expect(wrapper.find("br").length).toEqual(parts.length - 1);
    });

    it("converts underscores to italics", () => {
      data.sense[0].def = "foo _bar_ baz";
      entry = createEntry("a", "a:1", data);
      const wrapper = shallow(<EntryDefinition {...{entry}} />);
      expect(wrapper.find("em").first().text()).toEqual("bar");
    });
  });
});
