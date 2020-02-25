import * as actionTypes from "./actionTypes";

export const getFilmsList = () => {
  return {
    type: actionTypes.GET_FILMS_LIST,
  };
};

export const checkFilm = (film) => {
  return {
    type: actionTypes.CHECK_FILM,
    film
  };
};

export const searchFilter = (text) => {
  return {
    type: actionTypes.SEARCH_FILTER,
    text
  };
};

export const tagFilter = (tag) => {
  return (dispatch, getState) => {
    const inpVal = getState().flm.searchVal;
    dispatch({
      type: actionTypes.TAG_FILTER,
      tag,
      inpVal
    })
  }

};

