import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { definitionReducer } from "./definition";
import { searchReducer } from "./search";

const rootReducer = combineReducers({
  definition: definitionReducer,
  routing: routerReducer,
  search: searchReducer,
});

export default rootReducer;
