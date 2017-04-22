import { Action, handleActions } from "redux-actions"
import { DEFINITION_DONE, DEFINITION_ERROR, DEFINITION_START } from "../actions/definition"
import { IEntry } from "../api/Entry"

export interface IDefinitionState {
  readonly entries?: ReadonlyArray<IEntry>
  readonly error?: Error
  readonly id?: string
  readonly isLoading?: boolean
}

export const initialState: IDefinitionState = {
  entries: [],
  error: undefined,
  id: undefined,
  isLoading: false,
}

/* tslint:disable:object-literal-sort-keys */
export const definitionReducer = handleActions<any>({

  [DEFINITION_START]: (state: IDefinitionState, action: Action<string>): IDefinitionState =>
    Object.assign({}, state, {
      error: undefined,
      id: action.payload,
      isLoading: true,
    }),

  [DEFINITION_DONE]: (state: IDefinitionState, action: Action<IEntry[]>): IDefinitionState =>
    Object.assign({}, state, {
      entries: action.payload,
      error: undefined,
      isLoading: false,
    }),

  [DEFINITION_ERROR]: (state: IDefinitionState, action: Action<Error>): IDefinitionState =>
    Object.assign({}, state, {
      entries: [],
      error: action.payload,
      isLoading: false,
    }),

}, initialState)
