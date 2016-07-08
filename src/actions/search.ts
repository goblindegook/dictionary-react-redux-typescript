import { createAction } from "redux-actions";

export const SEARCH_START = "SEARCH_START";
export const searchStart = createAction(SEARCH_START);

export const SEARCH_DONE = "SEARCH_DONE";
export const searchDone = createAction(SEARCH_DONE);

export const SEARCH_ERROR = "SEARCH_ERROR";
export const searchError = createAction(SEARCH_ERROR);
