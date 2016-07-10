import { createAction } from "redux-actions";

export const DEFINITION_START = "DEFINITION_START";
export const definitionStart = createAction(DEFINITION_START);

export const DEFINITION_DONE = "DEFINITION_DONE";
export const definitionDone = createAction(DEFINITION_DONE);

export const DEFINITION_ERROR = "DEFINITION_ERROR";
export const definitionError = createAction(DEFINITION_ERROR);
