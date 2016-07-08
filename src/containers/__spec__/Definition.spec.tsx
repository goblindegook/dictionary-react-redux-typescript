import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import Definition from "../Definition";

const configureStore = require("redux-mock-store");
const middlewares = [];
const mockStore = configureStore(middlewares);

describe("Container", () => {
  describe("<Definition />", () => {
    let state;
    let store;
    let wrapper;

    before(() => {
      state = {};

      wrapper = mount(
        <Provider store={mockStore(state)}>
          <Definition />
        </Provider>
      );
    });

    it("renders", () => {
      expect(wrapper.find(Definition).length).toBe(1);
    });

    it("contains a single <EntryDefinition /> component", () => {
      expect(wrapper.find("EntryDefinition").length).toBe(1);
    });
  });
});
