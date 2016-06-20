import { searchStart, searchDone, searchError } from "../actions/search";
import { search } from "../api/DictionaryAPI";

const doSearch = (query: string = "") => (dispatch) => {
  dispatch(searchStart(query));

  return search(query)
    .then((results) => {
      dispatch(searchDone(results));
      return true;
    })
    .catch((error) => {
      dispatch(searchError(error));
      return true;
    });
};

export default doSearch;
