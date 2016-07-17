import * as expect from "expect";
import * as React from "react";
import "react-dom";
import { render } from "enzyme";
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
});
