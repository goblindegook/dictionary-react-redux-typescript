import { createAction } from "redux-actions";

export const DEFINE_START = "DEFINE_START";
export const defineStart = createAction(DEFINE_START);

export const DEFINE_DONE = "DEFINE_DONE";
export const defineDone = createAction(DEFINE_DONE);

export const DEFINE_ERROR = "DEFINE_ERROR";
export const defineError = createAction(DEFINE_ERROR);
