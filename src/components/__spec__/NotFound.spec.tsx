import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import NotFound from "../NotFound";

describe("Component", () => {
  describe("<NotFound />", () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<NotFound />);
    });

    it("renders", () => {
      expect(wrapper.is("div.error")).toBe(true);
    });
  });
});
