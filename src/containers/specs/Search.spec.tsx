import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { mount, shallow } from "enzyme";
import configureStore = require("redux-mock-store");

import Search from "../Search";

describe("Containers", () => {
  describe("<Search />", () => {
    const createStore = configureStore([]); // TODO: middlewares
    const mockStore = createStore({}); // TODO: mock state
    const wrapper = mount(
      <Provider store={mockStore}>
        <Search />
      </Provider>
    );

    it("should render", () => {
      expect(wrapper.find("section.search").length).toBe(1);
    });

    it("should contain a single <SearchInput /> component", () => {
      expect(wrapper.find("SearchInput").length).toBe(1);
    });

    it("should contain a single <EntryList /> component", () => {
      expect(wrapper.find("EntryList").length).toBe(1);
    });
  });
});
