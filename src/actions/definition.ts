import { createAction } from "redux-actions"
import { IEntry } from "../api/Entry"

export const DEFINITION_START = "DEFINITION_START"
export const definitionStart = createAction<string>(DEFINITION_START)

export const DEFINITION_DONE = "DEFINITION_DONE"
export const definitionDone = createAction<IEntry[]>(DEFINITION_DONE)

export const DEFINITION_ERROR = "DEFINITION_ERROR"
export const definitionError = createAction<Error>(DEFINITION_ERROR)
