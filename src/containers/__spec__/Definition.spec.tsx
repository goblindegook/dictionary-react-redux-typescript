import * as expect from "expect";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import createMockStore from '../../__spec__/helpers/createMockStore';
import { definitionStart } from "../../actions/definition";
import { createEntry } from "../../api/Entry";
import Definition from "../Definition";

describe("Container", () => {
  describe("<Definition />", () => {
    let state;
    let store;
    let wrapper;

    before(() => {
      state = {
        definition: {
          entries: [],
          error: null,
          isLoading: false,
        },
      };

      store = createMockStore(state);

      wrapper = mount(
        <Provider store={store}>
          <Definition />
        </Provider>
      );
    });

    it("renders", () => {
      expect(wrapper.find(Definition).length).toBe(1);
    });

    it("contains an <EntryDefinition /> component per entry", () => {
      state.definition.entries = [
        createEntry("a", "a:1", { "@n": "1", "@id": "a:1", "form": { "orth": "A", "pron": "á" } }),
        createEntry("a", "a:2", { "@n": "2", "@id": "a:2", "form": { "orth": "A", "pron": "á" } }),
        createEntry("a", "a:3", { "@n": "3", "@id": "a:3", "form": { "orth": "A", "pron": "á" } }),
      ];
      store = createMockStore(state);

      wrapper = mount(
        <Provider store={store}>
          <Definition />
        </Provider>
      );

      expect(wrapper.find("EntryDefinition").length).toBe(state.definition.entries.length);
      expect(wrapper.find("Error").length).toBe(0);
      expect(wrapper.find("LoadingIndicator").length).toBe(0);
    });

    it("does not dispatch actions on mount without an id parameter", () => {
      const actions = store.getActions();
      expect(actions.length).toBe(0);
    });

    it("dispatches a DEFINE_START on mount from id parameter", () => {
      const id = "parâmetro:1";
      const params = { id };

      wrapper = mount(
        <Provider store={store}>
          <Definition {...{params}} />
        </Provider>
      );

      const actions = store.getActions();
      expect(actions[0]).toEqual(definitionStart(id));
    });

    it("displays a loading indicator", () => {
      state.definition.isLoading = true;

      store = createMockStore(state);

      wrapper = mount(
        <Provider store={store}>
          <Definition />
        </Provider>
      );

      expect(wrapper.find("EntryDefinition").length).toBe(0);
      expect(wrapper.find("Error").length).toBe(0);
      expect(wrapper.find("LoadingIndicator").length).toBe(1);
    });

    it("displays a warning on error", () => {
      const message = "Error message";

      state.definition.isLoading = false;
      state.definition.error = new Error(message);

      store = createMockStore(state);

      wrapper = mount(
        <Provider store={store}>
          <Definition />
        </Provider>
      );

      expect(wrapper.find("EntryDefinition").length).toBe(0);
      expect(wrapper.find("Error").length).toBe(1);
      expect(wrapper.find("Error").props().message).toBe(message);
      expect(wrapper.find("LoadingIndicator").length).toBe(0);
    });
  });
});
