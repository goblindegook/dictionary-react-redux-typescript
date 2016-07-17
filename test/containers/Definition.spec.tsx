import * as expect from "expect";
import * as React from "react";
import "react-dom";
import * as Helmet from "react-helmet";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import createMockStore from "../_helpers/createMockStore";
import { definitionStart } from "../../src/actions/definition";
import { createEntry } from "../../src/api/Entry";
import { definitionTask } from "../../src/sagas/definition";
import Definition from "../../src/containers/Definition";

describe("<Definition />", () => {
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      definition: {
        entries: [],
        error: null,
        id: "",
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

  it("preloads definitions", () => {
    const id = "test";
    const preloaders = (Definition as any).preload({ id });

    preloaders.forEach(preloader => {
      expect(preloader[0]).toBe(definitionTask);
      expect(preloader[1]).toEqual(definitionStart(id));
    });
  });

  it("renders", () => {
    expect(wrapper.find(Definition).length).toBe(1);
  });

  it("contains an <EntryDefinition /> component per entry", () => {
    state.definition.id = "teste:1";
    state.definition.entries = [
      createEntry("a", "a:1", { "@n": "1", "@id": "a:1", form: { orth: "A" }, sense: [] }),
      createEntry("a", "a:2", { "@n": "2", "@id": "a:2", form: { orth: "A" }, sense: [] }),
      createEntry("a", "a:3", { "@n": "3", "@id": "a:3", form: { orth: "A" }, sense: [] }),
    ];
    store = createMockStore(state);

    wrapper = mount(
      <Provider store={store}>
        <Definition />
      </Provider>
    );

    expect((Helmet as any).peek().title).toBe(state.definition.id.replace(/:\d+$/, ""));
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

    expect((Helmet as any).peek().title).toBe("A carregar...");
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

    expect((Helmet as any).peek().title).toBe(message);
    expect(wrapper.find("EntryDefinition").length).toBe(0);
    expect(wrapper.find("Error").length).toBe(1);
    expect(wrapper.find("Error").props().message).toBe(message);
    expect(wrapper.find("LoadingIndicator").length).toBe(0);
  });

  it("displays a warning when no definition found", () => {
    const message = "Palavra não encontrada";

    state.definition.entries = [];

    store = createMockStore(state);

    wrapper = mount(
      <Provider store={store}>
        <Definition />
      </Provider>
    );

    expect((Helmet as any).peek().title).toBe(message);
    expect(wrapper.find("EntryDefinition").length).toBe(0);
    expect(wrapper.find("Error").length).toBe(1);
    expect(wrapper.find("Error").props().message).toBe(message);
    expect(wrapper.find("LoadingIndicator").length).toBe(0);
  });
});
