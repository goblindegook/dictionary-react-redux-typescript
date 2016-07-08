import { handleActions, Action } from "redux-actions";
import { SEARCH_START, SEARCH_DONE, SEARCH_ERROR } from "../actions/search";
import { IEntry } from "../api/Entry";

interface ISearchState {
  entries?: IEntry[];
  isLoading?: boolean;
  prefix?: string;
}

const initialState: ISearchState = {
  entries: [],
  isLoading: false,
  prefix: "",
};

export const searchReducer = handleActions({
  SEARCH_START: (state: ISearchState, action: Action<any>): ISearchState =>
    Object.assign({}, state, {
      isLoading: true,
      prefix: action.payload,
    }),
  SEARCH_DONE: (state: ISearchState, action: Action<any>): ISearchState =>
    Object.assign({}, state, {
      entries: action.payload,
      isLoading: false,
    }),
  SEARCH_ERROR: (state: ISearchState, action: Action<any>): ISearchState =>
    Object.assign({}, state, {
      entries: [],
      isLoading: false,
    }),
}, initialState);

export default searchReducer;
