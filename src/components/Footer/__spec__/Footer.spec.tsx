import * as expect from "expect";
import * as React from "react";
import "react-dom";
import { shallow } from "enzyme";

import Footer from "../";

describe("Component", () => {
  describe("<Footer />", () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<Footer />);
    });

    it("renders", () => {
      expect(wrapper.is("footer")).toBe(true);
    });
  });
});
