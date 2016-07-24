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
    const assets = { main: { css: "main.css" }, vendor: { css: "vendor.css" } };
    wrapper = shallow(<Document app={app} assets={assets} store={store} />);
    const elements = wrapper.find("head link");

    Object.keys(assets)
      .filter(chunk => assets[chunk].css)
      .forEach(chunk => {
        const href = assets[chunk].css;
        expect(elements.nodes.filter(node => node.props.href === href).length).toBe(1);
      });
  });

  it("renders script tags in the footer", () => {
    const assets = { main: { js: "main.js" }, vendor: { js: "vendor.js" } };
    wrapper = shallow(<Document app={app} assets={assets} store={store} />);
    const elements = wrapper.find("body script");

    Object.keys(assets)
      .filter(chunk => assets[chunk].js)
      .forEach(chunk => {
        const src = assets[chunk].js;
        expect(elements.nodes.filter(node => node.props.src === src).length).toBe(1);
      });
  });
});
