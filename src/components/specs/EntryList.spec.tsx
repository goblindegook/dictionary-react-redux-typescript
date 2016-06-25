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
        (value) => createEntry(value, value, value)
      );
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

    it("should contain all entries inside <EntryListItem /> components", () => {
      const wrapper = shallow(<EntryList {...{entries}} />);
      expect(wrapper.find("EntryListItem").length).toBe(entries.length);
    });

    it("should pass onClick handlers to <EntryListItem /> components", () => {
      const onClick = sinon.spy();
      const wrapper = shallow(<EntryList entries={entries} onClickEntry={onClick} />);
      expect(wrapper.find({onClick}).length).toBe(entries.length);
    });
  });
});
