import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import SearchInput from "../SearchInput";

describe("Containers", () => {
  describe("<SearchInput />", () => {
    it("should render", () => {
      const wrapper = shallow(<SearchInput />);
      expect(wrapper.is("input")).toBe(true);
    });

    it("should render <SearchInput /> with className", () => {
      const className: string = "test";
      const wrapper = shallow(<SearchInput {...{className}} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });
  });
});
