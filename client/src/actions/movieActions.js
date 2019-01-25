import axios from "axios";

import {
  GET_SEARCH_MOVIES,
  MOVIES_LOADING,
  SET_DETAILS_MOVIE,
  GET_MY_MOVIES,
  GET_ERRORS,
  CLEAR_MY_MOVIES,
  ADD_MOVIE,
  REMOVE_MOVIE,
  CLEAR_SEARCH_RESULTS
} from "./types";

import { getCurrentProfile } from "../actions/profileActions";

// GEt My movies
export const getMyMovies = () => dispatch => {
  axios
    .get("api/profile/movies/all")
    .then(res => {
      console.log(res.data.movies);
      dispatch({
        type: GET_MY_MOVIES,
        payload: res.data.movies
      });
    })

    .catch(err => console.log(err));
};

// Clear My movies
export const clearMyMovies = () => {
  return {
    type: CLEAR_MY_MOVIES
  };
};

// Search movie
export const onSearchSubmit = title => dispatch => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=cbf8a5918204c1c55f4c7ce039c99036&language=en-US&query=${title}&page=1&include_adult=false`
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_SEARCH_MOVIES,
        payload: res.data.results
      });
    })

    .catch(err => console.log(err));
};

// Set Detatil movie
export const setDetailsMovie = movie => {
  return {
    type: SET_DETAILS_MOVIE,
    payload: movie.movie
  };
};

// Add movie to collection
export const addMovieToCollection = movie => dispatch => {
  console.log(movie);
  axios
    .post("api/profile/movies", movie)
    .then(res => {
      dispatch({
        type: ADD_MOVIE,
        payload: movie
      });

      dispatch(getMyMovies());
      dispatch(getCurrentProfile());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove movie from collection
export const removeMovieFromCollection = movie_id => dispatch => {
  axios
    .delete(`api/profile/movies/${movie_id}`)
    .then(res => {
      dispatch({
        type: REMOVE_MOVIE,
        payload: movie_id
      });

      dispatch(getMyMovies());
      dispatch(getCurrentProfile());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setMoviesLoading = () => {
  return {
    type: MOVIES_LOADING
  };
};

// Clear search results
export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS
  };
};
