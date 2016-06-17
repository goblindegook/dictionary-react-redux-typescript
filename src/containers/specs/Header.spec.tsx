import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Header from "../Header";

describe("Containers", () => {
  describe("<Header />", () => {
    const wrapper = shallow(<Header />);

    it("should render <Header />", () => {
      expect(wrapper.is("div")).toBe(true);
    });
  });
});
