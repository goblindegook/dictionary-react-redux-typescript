import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Header from "../Header";

describe("Component", () => {
  describe("<Header />", () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<Header />);
    });

    it("renders", () => {
      expect(wrapper.is("header")).toBe(true);
    });
  });
});