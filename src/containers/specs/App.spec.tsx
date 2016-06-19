import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { Provider } from 'react-redux';

import App from "../App";

describe("Containers", () => {
  describe("<App />", () => {
    const wrapper = shallow(<App />);

    it("should be a Redux store provider", () => {
      expect(wrapper.is(Provider)).toBe(true);
    });

    it("should render a <div />", () => {
      expect(wrapper.find("div").first().hasClass("dictionary-app")).toBe(true);
    });

    it("should contain a single <Header /> component", () => {
      expect(wrapper.find("Header").length).toBe(1);
    });

    it("should allow children components", () => {
      const wrapper = shallow(<App><section className="child" /></App>);
      expect(wrapper.find("section.child").length).toBe(1);
    });

    it("should contain a single <Footer /> component", () => {
      expect(wrapper.find("Footer").length).toBe(1);
    });
  });
});
