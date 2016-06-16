import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import App from "./App";
// import Header from "../components/Header";
// import Main from "../components/Main";
// import Footer from "../components/Footer";

describe("Containers", () => {
  describe("<App />", () => {
    const wrapper = shallow(React.createElement(App));

    it("should render <App />", () => {
      expect(wrapper.is("div")).toBe(true);
    });

    xit("should contain a single <Header /> component", () => {
      // expect(wrapper.find(Header).length).toBe(1);
    });

    xit("should contain a single <Main /> component", () => {
      // expect(wrapper.find(Main).length).toBe(1);
    });

    xit("should contain a single <Footer /> component", () => {
      // expect(wrapper.find(Footer).length).toBe(1);
    });
  });
});
