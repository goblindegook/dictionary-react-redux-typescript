import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import LoadingIndicator from "../LoadingIndicator";

describe("Component", () => {
  describe("<LoadingIndicator />", () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<LoadingIndicator />);
    });

    it("renders", () => {
      expect(wrapper.is("div.loading")).toBe(true);
    });
  });
});
