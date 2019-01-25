import {
  GET_SEARCH_MOVIES,
  MOVIES_LOADING,
  SET_DETAILS_MOVIE,
  GET_MY_MOVIES,
  CLEAR_MY_MOVIES,
  ADD_MOVIE,
  REMOVE_MOVIE,
  CLEAR_SEARCH_RESULTS
} from "../actions/types";

const initialState = {
  searchMovies: [],
  myMovies: [],
  detailsMovie: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVIES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_MY_MOVIES:
      return {
        ...state,
        myMovies: action.payload,
        loading: false
      };
    case ADD_MOVIE:
      return {
        ...state,
        myMovies: [action.payload, ...state.myMovies],
        loading: false
      };
    case REMOVE_MOVIE:
      return {
        ...state,
        myMovies: [
          ...state.myMovies.slice(0, action.payload),
          ...state.myMovies.slice(action.payload + 1)
        ],
        loading: false
      };
    case CLEAR_MY_MOVIES:
      return {
        ...state,
        myMovies: []
      };
    case GET_SEARCH_MOVIES:
      return {
        ...state,
        searchMovies: action.payload,
        loading: false
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchMovies: [],
        loading: false
      };
    case SET_DETAILS_MOVIE:
      return {
        ...state,
        detailsMovie: action.payload
      };

    default:
      return state;
  }
}
