import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { mount, shallow } from "enzyme";

import Definition from "../Definition";

describe("Container", () => {
  // TODO: redux-mock-store
  xdescribe("<Definition />", () => {
    let wrapper;
    let state;

    before(() => {
      state = {};

      const mockStore: any = {};

      wrapper = mount(
        <Provider store={mockStore}>
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
