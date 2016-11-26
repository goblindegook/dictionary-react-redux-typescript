import * as expect from "expect"
import { searchDone, searchError, searchStart } from "../../src/actions/search"
import { createEntry } from "../../src/api/Entry"
import { ISearchState, searchReducer } from "../../src/reducers/search"

describe("Search reducer", () => {
  const error = new Error("test")
  const prefix = "test"
  let initialState: ISearchState

  beforeEach(() => {
    initialState = {
      entries: [],
      error: undefined,
      isLoading: false,
      prefix: undefined,
    }
  })

  it("provides an initial state", () => {
    const action = { type: "" }
    expect(searchReducer(undefined, action)).toEqual(initialState)
  })

  it("handles SEARCH_START actions", () => {
    initialState.prefix = prefix
    const action = searchStart(prefix)
    const actualState = searchReducer(initialState, action)

    expect(actualState).toNotEqual(initialState)
    expect(actualState.isLoading).toBe(true)
    expect(actualState.prefix).toBe(prefix)
  })

  it("handles SEARCH_DONE actions", () => {
    initialState.prefix = prefix
    const entries = [
      createEntry("a", "a:1", { "@n": "1", "@id": "a:1", "form": { orth: "A" }, "sense": [] }),
      createEntry("a", "a:2", { "@n": "2", "@id": "a:2", "form": { orth: "A" }, "sense": [] }),
      createEntry("a", "a:3", { "@n": "3", "@id": "a:3", "form": { orth: "A" }, "sense": [] }),
    ]
    const action = searchDone(entries)
    const actualState = searchReducer(initialState, action)

    expect(actualState).toNotEqual(initialState)
    expect(actualState.isLoading).toBe(false)
    expect(actualState.entries).toEqual(entries)
    expect(actualState.prefix).toBe(prefix)
    expect(actualState.error).toBe(undefined)
  })

  it("handles SEARCH_ERROR actions", () => {
    initialState.prefix = prefix
    const action = searchError(error)
    const actualState = searchReducer(initialState, action)

    expect(actualState).toNotEqual(initialState)
    expect(actualState.isLoading).toBe(false)
    expect(actualState.entries).toEqual([])
    expect(actualState.prefix).toBe(prefix)
    expect(actualState.error).toBe(error)
  })
})
