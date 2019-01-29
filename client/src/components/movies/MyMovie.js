import React, { Component } from "react";

import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

import { removeMovieFromCollection } from "../../actions/movieActions";

class MyMovie extends Component {
  render() {
    const {
      title,

      original_title,
      vote_average,
      release_date,
      poster_path,
      overview,
      movie_id
    } = this.props.movie;

    const year = release_date.slice(0, 4);
    return (
      <div className="section-moviedetails-body">
        <div className="section-moviedetails-body-image">
          <img
            alt="Movie poster"
            src={`http://image.tmdb.org/t/p/w185/${poster_path}`}
          />
        </div>
        <div className="section-moviedetails-body-text">
          <div>
            <h2 className="section-moviedetails-title-primary">{title}</h2>
            <h3 className="section-moviedetails-title-secondary">
              {original_title}
            </h3>
          </div>
          <h4>{year}</h4>

          <p>{overview}</p>
        </div>
        <div className="section-movie-details-vote">
          <h1>{vote_average}</h1>
          <button
            className="button button-red"
            onClick={() => this.props.removeMovieFromCollection(movie_id)}
          >
            DELETE
          </button>
        </div>
      </div>
    );
  }
}

MyMovie.propTypes = {
  removeMovieFromCollection: PropTypes.func.isRequired
};

export default connect(
  null,
  { removeMovieFromCollection }
)(MyMovie);
