import { searchStart, searchDone, searchError } from "../actions/search";
import { search } from "../api/DictionaryAPI";

const searchThunk = (prefix = "") => async (dispatch) => {
  dispatch(searchStart(prefix));

  if (prefix.trim().length === 0) {
    return await dispatch(searchDone([]));
  }

  try {
    const results = await search(prefix);
    return dispatch(searchDone(results));

  } catch (error) {
    return dispatch(searchError(error));
  }
};

export default searchThunk;
