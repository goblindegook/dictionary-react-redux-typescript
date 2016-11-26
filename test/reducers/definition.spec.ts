import * as expect from "expect"
import { definitionDone, definitionError, definitionStart } from "../../src/actions/definition"
import { createEntry } from "../../src/api/Entry"
import { definitionReducer, IDefinitionState } from "../../src/reducers/definition"

describe("Definition reducer", () => {
  const id = "test"
  let initialState: IDefinitionState

  beforeEach(() => {
    initialState = {
      entries: [],
      error: undefined,
      id: undefined,
      isLoading: false,
    }
  })

  it("provides an initial state", () => {
    const action = { type: "" }
    expect(definitionReducer(undefined, action)).toEqual(initialState)
  })

  it("handles DEFINITION_START actions", () => {
    const action = definitionStart(id)
    const actualState = definitionReducer(initialState, action)

    expect(actualState).toNotEqual(initialState)
    expect(actualState.isLoading).toBe(true)
  })

  it("handles DEFINITION_DONE actions", () => {
    const entries = [ createEntry("a", "a:1", { "@n": "1", "@id": "a:1", "form": { orth: "A" }, "sense": [] }) ]
    const action = definitionDone(entries)
    const actualState = definitionReducer(initialState, action)

    expect(actualState).toNotEqual(initialState)
    expect(actualState.isLoading).toBe(false)
    expect(actualState.entries).toEqual(entries)
    expect(actualState.error).toBe(undefined)
  })

  it("handles DEFINITION_ERROR actions", () => {
    const error = new Error("test")
    const action = definitionError(error)
    const actualState = definitionReducer(initialState, action)

    expect(actualState).toNotEqual(initialState)
    expect(actualState.isLoading).toBe(false)
    expect(actualState.entries).toEqual([])
    expect(actualState.error).toBe(error)
  })
})
