import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { mount, shallow } from "enzyme";
import configureStore = require("redux-mock-store");

import Search from "../Search";

describe("Container", () => {
  describe("<Search />", () => {
    let wrapper;

    before(() => {
      const createStore = configureStore([
        thunk,
      ]);
      const mockStore = createStore({}); // TODO: mock state

      wrapper = mount(
        <Provider store={mockStore}>
          <Search />
        </Provider>
      );
    });

    it("renders", () => {
      expect(wrapper.find("section.search").length).toBe(1);
    });

    it("contains a single <SearchInput /> component", () => {
      expect(wrapper.find("SearchInput").length).toBe(1);
    });

    it("contains a single <EntryList /> component", () => {
      expect(wrapper.find("EntryList").length).toBe(1);
    });

    xit("dispatches a search thunk on change", () => {
      // TODO
    });
  });
});
