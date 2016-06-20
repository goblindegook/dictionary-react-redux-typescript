import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Header from "../Header";

describe("Components", () => {
  describe("<Header />", () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<Header />);
    });

    it("should render", () => {
      expect(wrapper.is("header")).toBe(true);
    });
  });
});
