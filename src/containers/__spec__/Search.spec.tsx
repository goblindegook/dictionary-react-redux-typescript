import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as redux from "redux";
import thunk from "redux-thunk";
import { mount, shallow } from "enzyme";
import Search from "../Search";
import { searchStart } from "../../actions/search";
import { createEntry } from "../../api/Entry";

const configureStore = require("redux-mock-store");
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe("Container", () => {
  describe("<Search />", () => {
    let state;
    let store;
    let wrapper;

    beforeEach(() => {
      state = {
        search: {
          entries: [
            createEntry("one", "one", "one"),
            createEntry("two", "two", "two"),
            createEntry("three", "three", "three"),
          ],
          isLoading: false,
          prefix: "test",
        },
      };

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

    it("contains a <EntryListItem /> per results entry", () => {
      expect(wrapper.find("EntryListItem").length).toBe(state.search.entries.length);
    });

    ["test", ""].forEach((prefix) => {
      const contextDescription = prefix.length ? "when searching" : "when not searching";
      const doesOrDoesNotDisplay = prefix.length ? "displays" : "does not display";

      context(contextDescription, () => {
        it(doesOrDoesNotDisplay + " an <EntryList /> component", () => {
          state.search.prefix = prefix;

          store = mockStore(state);

          wrapper = mount(
            <Provider store={store}>
              <Search />
            </Provider>
          );

          expect(wrapper.find("EntryList").length).toBe(prefix.length ? 1 : 0);
        });

        it(doesOrDoesNotDisplay + " a loading indicator", () => {
          state.search.isLoading = true;
          state.search.prefix = prefix;

          store = mockStore(state);

          wrapper = mount(
            <Provider store={mockStore(state)}>
              <Search />
            </Provider>
          );

          expect(wrapper.find("LoadingIndicator").length).toBe(prefix.length ? 1 : 0);
        });

        it(doesOrDoesNotDisplay + " a warning on no results", () => {
          state.search.isLoading = false;
          state.search.entries = [];
          state.search.prefix = prefix;

          store = mockStore(state);

          wrapper = mount(
            <Provider store={mockStore(state)}>
              <Search />
            </Provider>
          );

          expect(wrapper.find("NotFound").length).toBe(prefix.length ? 1 : 0);
        });
      });
    });

    it("dispatches a SEARCH_START via thunk on query", () => {
      const prefix = "test";

      wrapper.find('input').simulate("change", {
        target: {
          value: prefix,
        },
      });

      const actions = store.getActions();

      expect(actions[0]).toEqual(searchStart(prefix));
    });
  });
});
