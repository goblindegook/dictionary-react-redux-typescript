import * as expect from "expect";
import * as React from "react";
import "react-dom";
import { shallow } from "enzyme";
import Warning from "../../src/components/Warning";

describe("Component", () => {
  describe("<Warning />", () => {
    it("renders", () => {
      const wrapper = shallow(<Warning />);
      expect(wrapper.is("div.error")).toBe(true);
    });

    it("renders with message", () => {
      const message = "Warning message";
      const wrapper = shallow(<Warning {...{message}} />);
      expect(wrapper.find("div.message").text()).toBe(message);
    });

    it("renders with default message", () => {
      const wrapper = shallow(<Warning />);
      expect(wrapper.find("div.message").text()).toBe("Erro");
    });
  });
});
