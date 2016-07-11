import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as redux from "redux";
import { mount, shallow } from "enzyme";
import createMockStore from '../../__spec__/helpers/createMockStore';
import { searchStart } from "../../actions/search";
import { createEntry } from "../../api/Entry";
import Search from "../Search";

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
          error: null,
          isLoading: false,
          prefix: "test",
        },
      };

      store = createMockStore(state);

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

          store = createMockStore(state);

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

          store = createMockStore(state);

          wrapper = mount(
            <Provider store={store}>
              <Search />
            </Provider>
          );

          expect(wrapper.find("LoadingIndicator").length).toBe(prefix.length ? 1 : 0);
        });

        it(doesOrDoesNotDisplay + " an error on no results", () => {
          state.search.isLoading = false;
          state.search.entries = [];
          state.search.prefix = prefix;

          store = createMockStore(state);

          wrapper = mount(
            <Provider store={store}>
              <Search />
            </Provider>
          );

          expect(wrapper.find("Error").length).toBe(prefix.length ? 1 : 0);
        });
      });
    });

    it("displays an error message", () => {
      const message = "Error";

      state.search.isLoading = false;
      state.search.error = new Error(message);

      store = createMockStore(state);

      wrapper = mount(
        <Provider store={store}>
          <Search />
        </Provider>
      );

      expect(wrapper.find("Error").length).toBe(1);
      expect(wrapper.find("Error").props().message).toBe(message);
    });

    it("dispatches a SEARCH_START on query", () => {
      const prefix = "test";

      wrapper.find('input').simulate("change", {
        target: {
          value: prefix,
        },
      });

      const actions = store.getActions();

      expect(actions[0]).toEqual(searchStart(prefix));
    });

    it("sets the SearchInput text to the prefix parameter", () => {
      const prefix = "parâmetro";
      const params = { prefix };

      state.search.prefix = "";

      store = createMockStore(state);

      wrapper = mount(
        <Provider store={store}>
          <Search {...{params}} />
        </Provider>
      );

      expect(wrapper.find("SearchInput").props().text).toBe(prefix);
    });

    it("dispatches a SEARCH_START on mount from id parameter", () => {
      const prefix = "parâmetro";
      const params = { prefix };

      wrapper = mount(
        <Provider store={store}>
          <Search {...{params}} />
        </Provider>
      );

      const actions = store.getActions();
      expect(actions[0]).toEqual(searchStart(prefix));
    });

    xit("sets the URL for the current search when pressing the Enter key", () => {
      const prefix = "test";

      wrapper.find('input').simulate("change", {
        target: {
          value: prefix,
        },
      });

      wrapper.find('input').simulate("keyup", {
        keyCode: 13,
      });

      expect(window.location.pathname).toBe("/search/" + prefix);
    });
  });
});
