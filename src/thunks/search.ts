import { searchStart, searchDone, searchError } from "../actions/search";
import { search } from "../api/DictionaryAPI";

const searchThunk = (query = "") => (dispatch) => {
  dispatch(searchStart(query));

  if (query.trim().length === 0) {
    return new Promise((resolve) => resolve(dispatch(searchDone([]))));
  }

  return search(query)
    .then((results) => dispatch(searchDone(results)))
    .catch((error) => dispatch(searchError(error)));
};

export default searchThunk;
