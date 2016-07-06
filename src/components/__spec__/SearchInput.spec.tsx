import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";
import * as sinon from "sinon";

import SearchInput from "../SearchInput";

describe("Component", () => {
  describe("<SearchInput />", () => {
    it("renders", () => {
      const wrapper = shallow(<SearchInput />);
      expect(wrapper.is("input")).toBe(true);
    });

    it("renders with className", () => {
      const className: string = "test";
      const wrapper = shallow(<SearchInput {...{className}} />);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    it("invokes onChange callbacks", () => {
      const onChange = sinon.spy();
      const event = { target: { value: 'test' } };
      const wrapper = shallow(<SearchInput {...{onChange}} />);
      wrapper.find("input").simulate("change", event);
      expect(onChange.callCount).toBe(1);
      expect(onChange.calledWith(event)).toBe(true);
    });
  });
});
