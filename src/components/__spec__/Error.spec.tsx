import * as expect from "expect";
import * as React from "react";
import "react-dom";
import { shallow } from "enzyme";

import Error from "../Error";

describe("Component", () => {
  describe("<Error />", () => {

    it("renders", () => {
      const wrapper = shallow(<Error />);
      expect(wrapper.is("div.error")).toBe(true);
    });

    it("renders with message", () => {
      const message = "Error message";
      const wrapper = shallow(<Error {...{message}} />);
      expect(wrapper.find("div.message").text()).toBe(message);
    });

    it("renders with default message", () => {
      const wrapper = shallow(<Error />);
      expect(wrapper.find("div.message").text()).toBe("Erro");
    });
  });
});
