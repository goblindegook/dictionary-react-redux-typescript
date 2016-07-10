import * as expect from "expect";
import { definitionStart, definitionDone, definitionError } from "../../actions/definition";
import { createEntry } from "../../api/Entry";
import definitionReducer from "../definition";

describe("Definition reducer", () => {
  const id = "test";
  let initialState;

  beforeEach(() => {
    initialState = {
      entry: null,
      error: null,
      isLoading: false,
    };
  });

  it("provides an initial state", () => {
    const action = { type: "" };
    expect(definitionReducer(undefined, action)).toEqual(initialState);
  });

  it("handles DEFINITION_START actions", () => {
    const action = definitionStart(id);
    const actualState = definitionReducer(initialState, action);

    expect(actualState).toNotEqual(initialState);
    expect(actualState.isLoading).toBe(true);
  });

  it("handles DEFINITION_DONE actions", () => {
    const entry = createEntry("one", "one", "one");
    const action = definitionDone(entry);
    const actualState = definitionReducer(initialState, action);

    expect(actualState).toNotEqual(initialState);
    expect(actualState.isLoading).toBe(false);
    expect(actualState.entry).toEqual(entry);
    expect(actualState.error).toBe(null);
  });

  it("handles DEFINITION_ERROR actions", () => {
    const error = new Error("test");
    const action = definitionError(error);
    const actualState = definitionReducer(initialState, action);

    expect(actualState).toNotEqual(initialState);
    expect(actualState.isLoading).toBe(false);
    expect(actualState.entry).toEqual(null);
    expect(actualState.error).toBe(error);
  });
});
