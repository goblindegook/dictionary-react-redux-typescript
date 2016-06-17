import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Search from "../Search";

describe("Containers", () => {
  describe("<Search />", () => {
    const wrapper = shallow(<Search />);

    it("should render", () => {
      expect(wrapper.is("section.search")).toBe(true);
    });

    it("should contain a single <SearchInput /> component", () => {
      expect(wrapper.find("SearchInput").length).toBe(1);
    });

    it("should contain a single <EntryList /> component", () => {
      expect(wrapper.find("EntryList").length).toBe(1);
    });
  });
});
