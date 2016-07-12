import { handleActions, Action } from "redux-actions";
import { SEARCH_START, SEARCH_DONE, SEARCH_ERROR } from "../actions/search";
import { IDictionaryEntry } from "../api/Entry";

interface ISearchState {
  entries?: IDictionaryEntry[];
  error?: Error;
  isLoading?: boolean;
  prefix?: string;
}

const initialState: ISearchState = {
  entries: [],
  error: null,
  isLoading: false,
  prefix: "",
};

export const searchReducer = handleActions({

  SEARCH_START: (state: ISearchState, action: Action<any>): ISearchState =>
    Object.assign({}, state, {
      error: null,
      isLoading: true,
      prefix: action.payload,
    } as ISearchState),

  SEARCH_DONE: (state: ISearchState, action: Action<any>): ISearchState =>
    Object.assign({}, state, {
      entries: action.payload,
      error: null,
      isLoading: false,
    } as ISearchState),

  SEARCH_ERROR: (state: ISearchState, action: Action<any>): ISearchState =>
    Object.assign({}, state, {
      entries: [],
      error: action.payload,
      isLoading: false,
    } as ISearchState),
    
}, initialState);

export default searchReducer;
