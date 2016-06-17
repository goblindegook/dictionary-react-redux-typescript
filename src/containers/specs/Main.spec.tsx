import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import Main from "../Main";

describe("Containers", () => {
  describe("<Main />", () => {
    const wrapper = shallow(<Main />);

    it("should render <Main />", () => {
      expect(wrapper.is("div")).toBe(true);
    });
  });
});
