import * as expect from "expect";
import * as React from "react";
import "react-dom";
import { render, shallow } from "enzyme";
import serialize = require("serialize-javascript");
import createMockStore from "../_helpers/createMockStore";
import Document from "../../src/containers/Document";

describe("<Document />", () => {
  let app;
  let store;
  let wrapper;

  beforeEach(() => {
    app = <div>App</div>;
    store = createMockStore({ foo: "bar" });
    wrapper = render(<Document app={app} store={store} />);
  });

  it("renders a <html /> tag", () => {
    expect(wrapper.find("html").first()).toExist();
  });

  it("renders the app", () => {
    expect(wrapper.find("#root").text()).toBe("App");
  });

  it("renders serialized state inside a footer <script> tag", () => {
    expect(wrapper.find("body script").first().text())
      .toBe(`window.__PRELOADED__=${serialize(store.getState())};`);
  });

  it("renders style link tags in the header", () => {
    const assets = { css: ["foo.css", "bar.css", "baz.css"] };
    wrapper = shallow(<Document app={app} assets={assets} store={store} />);
    let index = 0;
    wrapper.find("head link").forEach(element => {
      const props = element.props();
      if (props.rel === "stylesheet") {
        const file = assets.css[index++];
        expect(props.href.match(RegExp(file))).toExist();
      }
    });
  });

  it("renders script tags in the footer", () => {
    const assets = { js: ["foo.js", "bar.js", "baz.js"] };
    wrapper = shallow(<Document app={app} assets={assets} store={store} />);
    let index = 0;
    wrapper.find("body script").forEach(element => {
      const props = element.props();
      if (props.src) {
        const file = assets.js[index++];
        expect(props.src.match(RegExp(file))).toExist();
      }
    });
  });
});
