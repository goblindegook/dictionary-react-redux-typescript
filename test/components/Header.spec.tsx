import * as expect from "expect";
import * as React from "react";
import "react-dom";
import { shallow } from "enzyme";
import Header from "../../src/components/Header";

describe("Component", () => {
  describe("<Header />", () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<Header />);
    });

    it("renders", () => {
      expect(wrapper.is("header")).toBe(true);
    });

    it("displays a title", () => {
      expect(wrapper.find("h1").text()).toExist();
    });
  });
});
