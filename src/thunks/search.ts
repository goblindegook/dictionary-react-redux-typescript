import { searchStart, searchDone, searchError } from "../actions/search";
import { search } from "../api/DictionaryAPI";

const searchThunk = (prefix = "") => (dispatch) => {
  dispatch(searchStart(prefix));

  if (prefix.trim().length === 0) {
    return new Promise((resolve) => resolve(dispatch(searchDone([]))));
  }

  return search(prefix)
    .then((results) => dispatch(searchDone(results)))
    .catch((error) => dispatch(searchError(error)));
};

export default searchThunk;
