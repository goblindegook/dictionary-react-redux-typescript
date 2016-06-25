import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { shallow } from "enzyme";

import App from "../App";

describe("Container", () => {
  describe("<App />", () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<App />);
    });

    it("is a Redux store provider", () => {
      expect(wrapper.is(Provider)).toBe(true);
    });

    it("renders a <div />", () => {
      expect(wrapper.find("div").first().hasClass("dictionary-app")).toBe(true);
    });

    it("contains a single <Header /> component", () => {
      expect(wrapper.find("Header").length).toBe(1);
    });

    it("allows children components", () => {
      wrapper = shallow(<App><section className="child" /></App>);
      expect(wrapper.find("section.child").length).toBe(1);
    });

    it("contains a single <Footer /> component", () => {
      expect(wrapper.find("Footer").length).toBe(1);
    });
  });
});
