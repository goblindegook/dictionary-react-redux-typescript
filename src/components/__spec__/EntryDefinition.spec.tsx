import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { createEntry } from "../../api/Entry";
import EntryDefinition from "../EntryDefinition";

describe("Component", () => {
  describe("<EntryDefinition />", () => {
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
      expect(wrapper.find("h2").first().text()).toBe(title);
    });

    xit("renders with entry", () => {
      const entry = createEntry("test", "test:1", { test: "test" });
      const wrapper = shallow(<EntryDefinition {...{entry}} />);
      // expect(wrapper).toEqual(entry);
    });
  });
});
