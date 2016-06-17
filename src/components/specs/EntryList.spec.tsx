import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import EntryList from "../EntryList";
import Entry from "../../api/Entry";

describe("Containers", () => {
  describe("<EntryList />", () => {
    const entries = ["one", "two", "three"].map((value, index) => {
      const entry = new Entry();
      entry.id = index;
      entry.name = value;
      entry.content = value;
      return entry;
    });

    it("should render", () => {
      const wrapper = shallow(<EntryList />);
      expect(wrapper.is("ul")).toBe(true);
    });

    it("should render <EntryList /> with className", () => {
      const className: string = "test";
      const wrapper = shallow(<EntryList {...{className}} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    it("should contain all entries inside <Entry /> components", () => {
      const wrapper = shallow(<EntryList {...{entries}} />);
      expect(wrapper.find("EntryListItem").length).toBe(entries.length);
    });
  });
});
