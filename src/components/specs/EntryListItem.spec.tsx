import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import EntryListItem from "../EntryListItem";

describe("Containers", () => {
  describe("<EntryListItem />", () => {
    it("should render", () => {
      const wrapper = shallow(<EntryListItem />);
      expect(wrapper.is("li")).toBe(true);
    });

    it("should render <EntryListItem /> with className", () => {
      const className: string = "test";
      const wrapper = shallow(<EntryListItem {...{className}} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    it("should render <EntryListItem /> with name", () => {
      const name: string = "test";
      const wrapper = shallow(<EntryListItem {...{name}} />);

      expect(wrapper.find("li").text()).toBe(name);
    });
  });
});
