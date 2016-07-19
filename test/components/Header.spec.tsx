import * as expect from "expect";
import * as React from "react";
import "react-dom";
import { shallow } from "enzyme";
import Header from "../../src/components/Header";

describe("Component", () => {
  describe("<Header />", () => {
    it("renders", () => {
      const wrapper = shallow(<Header title="" />);
      expect(wrapper.is("header")).toBe(true);
    });

    it("displays a title", () => {
      const title = "test";
      const wrapper = shallow(<Header {...{title}} />);
      expect(wrapper.find("h1").text()).toBe(title);
    });
  });
});
