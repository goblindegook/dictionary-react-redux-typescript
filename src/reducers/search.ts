import { Action, handleActions } from "redux-actions"
import { SEARCH_DONE, SEARCH_ERROR, SEARCH_START } from "../actions/search"
import { IEntry } from "../api/Entry"

export interface ISearchState {
  readonly entries?: ReadonlyArray<IEntry>
  readonly error?: Error
  readonly isLoading?: boolean
  readonly prefix?: string
}

export const initialState: ISearchState = {
  entries: [],
  error: undefined,
  isLoading: false,
  prefix: undefined,
}

/* tslint:disable:object-literal-sort-keys */
export const searchReducer = handleActions<any>({

  [SEARCH_START]: (state: ISearchState, action: Action<string>): ISearchState =>
    Object.assign({}, state, {
      error: undefined,
      isLoading: true,
      prefix: action.payload,
    }),

  [SEARCH_DONE]: (state: ISearchState, action: Action<IEntry[]>): ISearchState =>
    Object.assign({}, state, {
      entries: action.payload,
      error: undefined,
      isLoading: false,
    }),

  [SEARCH_ERROR]: (state: ISearchState, action: Action<Error>): ISearchState =>
    Object.assign({}, state, {
      entries: [],
      error: action.payload,
      isLoading: false,
    }),

}, initialState)
