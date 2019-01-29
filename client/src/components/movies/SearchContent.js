import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TrendingMovie from "./TrendingMovie";

import {
  clearSearchResults,
  setMoviesLoading
} from "../../actions/movieActions";

class SearchContent extends Component {
  onClickEvent = () => {
    this.props.setMoviesLoading();
    this.props.clearSearchResults();
  };
  render() {
    const { searchMovies } = this.props;
    if (searchMovies.length === 0) {
      return null;
    } else {
      return (
        <>
          <button
            type="button"
            className="button button-red"
            onClick={this.onClickEvent}
          >
            CLEAR SEARCH
          </button>
          <div className="section-search-results">
            {searchMovies.map(movie => (
              <TrendingMovie movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      );
    }
  }
}

SearchContent.propTypes = {
  clearSearchResults: PropTypes.func.isRequired,
  setMoviesLoading: PropTypes.func.isRequired
};

export default connect(
  null,
  { clearSearchResults, setMoviesLoading }
)(SearchContent);
