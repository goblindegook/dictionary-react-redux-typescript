import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { render } from "enzyme";
import createMockStore from '../../__spec__/helpers/createMockStore';
import Document from "../Document";

describe("<Document />", () => {
  let app;
  let store;
  let wrapper;

  beforeEach(() => {
    app = <div>App</div>;
    store = createMockStore({});
    wrapper = render(<Document app={app} store={store} />);
  });

  it("renders a <html /> tag", () => {
    expect(wrapper.find("html").first()).toExist();
  });

  it("renders the app", () => {
    expect(wrapper.find("#root").text()).toBe("App");
  });
});
