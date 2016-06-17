import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";
import * as sinon from "sinon";

import SearchInput from "../SearchInput";

describe("Containers", () => {
  describe("<SearchInput />", () => {
    it("should render", () => {
      const wrapper = shallow(<SearchInput />);
      expect(wrapper.is("input")).toBe(true);
    });

    it("should render with className", () => {
      const className: string = "test";
      const wrapper = shallow(<SearchInput {...{className}} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    it("should invoke onChange callbacks", () => {
      const onChange = sinon.spy();
      const wrapper = shallow(<SearchInput {...{onChange}} />);

      wrapper.find("input").simulate("change");

      expect(onChange.callCount).toBe(1);
    });
  });
});
