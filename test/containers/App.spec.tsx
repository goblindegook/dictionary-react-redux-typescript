import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import App from "../../src/containers/App";
// import Header from "../../src/components/Header";
// import Main from "../../src/components/Main";
// import Footer from "../../src/components/Footer";

describe("components", () => {
  describe("<App />", () => {
    const wrapper: any = shallow(<App />);

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
