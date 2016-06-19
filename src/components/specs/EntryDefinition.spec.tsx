import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import EntryDefinition from "../EntryDefinition";

describe("Containers", () => {
  describe("<EntryDefinition />", () => {
    it("should render", () => {
      const wrapper = shallow(<EntryDefinition />);
      expect(wrapper.is("article")).toBe(true);
    });

    it("should render with className", () => {
      const className = "test";
      const wrapper = shallow(<EntryDefinition {...{className}} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    it("should render with title", () => {
      const title = "test";
      const wrapper = shallow(<EntryDefinition {...{title}} />);
      expect(wrapper.find("h2").first().text()).toBe(title);
    });
  });
});
