import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import App from "../App";

describe("Containers", () => {
  describe("<App />", () => {
    const wrapper = shallow(<App />);

    it("should render <App />", () => {
      expect(wrapper.is("div")).toBe(true);
    });

    it("should contain a single <Header /> component", () => {
      expect(wrapper.find("Header").length).toBe(1);
    });

    it("should contain a single <Main /> component", () => {
      expect(wrapper.find("Main").length).toBe(1);
    });

    it("should contain a single <Footer /> component", () => {
      expect(wrapper.find("Footer").length).toBe(1);
    });
  });
});
