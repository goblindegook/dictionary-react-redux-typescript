import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Footer from "../Footer";

describe("Components", () => {
  describe("<Footer />", () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<Footer />);
    });

    it("should render", () => {
      expect(wrapper.is("footer")).toBe(true);
    });
  });
});
