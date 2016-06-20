import { createAction } from "redux-actions";

export const searchStart = createAction("SEARCH_START");

export const searchDone = createAction("SEARCH_DONE");

export const searchError = createAction("SEARCH_ERROR");
