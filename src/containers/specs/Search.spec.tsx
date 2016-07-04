import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as redux from "redux";
import thunk from "redux-thunk";
import { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";

import Search from "../Search";
import { createEntry } from "../../api/Entry";

describe("Container", () => {
  xdescribe("<Search />", () => {
    let wrapper;
    let state;
    let mockStore;
    let store;

    beforeEach(() => {
      state = {
        search: {
          entries: [
            createEntry("one", "one", "one"),
            createEntry("two", "two", "two"),
            createEntry("three", "three", "three"),
          ],
          isLoading: false,
          query: "",
        },
      };

      const middlewares = [ thunk ];
      mockStore = configureStore(middlewares);
      store = mockStore(state);

      wrapper = mount(
        <Provider store={store}>
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

    it("contains one <EntryListItem /> per results entry", () => {
      expect(wrapper.find("EntryListItem").length).toBe(state.search.entries.length);
    });

    xit("dispatches a search thunk on query", () => {
      // TODO
    });
  });
});
