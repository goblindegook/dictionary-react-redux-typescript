import { combineReducers } from "redux";
import { definitionReducer } from "./definition";
import { searchReducer } from "./search";

const rootReducer = combineReducers({
  definition: definitionReducer,
  search: searchReducer,
});

export default rootReducer;
