import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Definition from "../Definition";

describe("Containers", () => {
  describe("<Definition />", () => {
    const wrapper = shallow(<Definition />);

    it("should render", () => {
      expect(wrapper.is("section.definition")).toBe(true);
    });

    it("should contain a single <EntryDefinition /> component", () => {
      expect(wrapper.find("EntryDefinition").length).toBe(1);
    });
  });
});
