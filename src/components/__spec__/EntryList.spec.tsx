import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as sinon from "sinon";
import { shallow } from "enzyme";

import EntryList from "../EntryList";
import { createEntry } from "../../api/Entry";

describe("Component", () => {
  describe("<EntryList />", () => {
    let entries;

    before(() => {
      entries = ["one", "two", "three"].map(
        (value) => createEntry(value, value, { "@n": "1", "@id": "n:1", form: { orth: "n" }, sense: [] })
      );
    });

    it("should render", () => {
      const wrapper = shallow(<EntryList {...{entries}} />);
      expect(wrapper.is("ul")).toBe(true);
    });

    it("should render <EntryList /> with className", () => {
      const className: string = "test";
      const wrapper = shallow(<EntryList {...{className, entries}} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    it("should contain all entries inside <EntryListItem /> components", () => {
      const wrapper = shallow(<EntryList {...{entries}} />);
      expect(wrapper.find("EntryListItem").length).toBe(entries.length);
    });
  });
});
