import { createAction } from "redux-actions"
import { IEntry } from "../api/Entry"

export const SEARCH_START = "SEARCH_START"
export const searchStart = createAction<string>(SEARCH_START)

export const SEARCH_DONE = "SEARCH_DONE"
export const searchDone = createAction<IEntry[]>(SEARCH_DONE)

export const SEARCH_ERROR = "SEARCH_ERROR"
export const searchError = createAction<Error>(SEARCH_ERROR)
