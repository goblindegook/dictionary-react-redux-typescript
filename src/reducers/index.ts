import { routerReducer } from "react-router-redux"
import { combineReducers } from "redux"
import { definitionReducer, IDefinitionState } from "./definition"
import { ISearchState, searchReducer } from "./search"

export interface IApplicationState {
  definition: IDefinitionState
  routing: any
  search: ISearchState
}

export const rootReducer = combineReducers<IApplicationState>({
  definition: definitionReducer,
  routing: routerReducer,
  search: searchReducer,
})
