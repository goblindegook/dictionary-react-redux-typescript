import { combineReducers } from "redux";
import { searchReducer } from "./search";

export default combineReducers({
  search: searchReducer,
});
