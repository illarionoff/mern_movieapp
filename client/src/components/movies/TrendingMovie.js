import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import {
  setDetailsMovie,
  addMovieToCollection,
  removeMovieFromCollection
} from "../../actions/movieActions";

class TrendingMovie extends Component {
  onClick = e => {
    e.preventDefault();
    const movie = {
      movie: this.props.movie
    };
    this.props.setDetailsMovie(movie);
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { myMovies } = this.props.movies;
    const {
      title,
      vote_average,
      release_date,
      poster_path,
      id
    } = this.props.movie;
    let shortTitle;
    const year = release_date.slice(0, 4);
    if (title.length > 13) {
      shortTitle = title.substring(0, 12) + "...";
    } else {
      shortTitle = title;
    }

    let likeButton;

    if (isAuthenticated) {
      if (myMovies.some(movie => parseInt(movie.movie_id) === id)) {
        likeButton = likeButton = (
          <button
            type="button"
            className="button button-red button-add"
            onClick={() => this.props.removeMovieFromCollection(id)}
          >
            Remove
          </button>
        );
      } else {
        likeButton = (
          <button
            type="button"
            className="button button-green button-add"
            onClick={() => this.props.addMovieToCollection(this.props.movie)}
          >
            ADD
          </button>
        );
      }
    } else {
      likeButton = (
        <Link to="/login" style={{ marginLeft: "auto", color: "black" }}>
          <button type="button" className="button button-green">
            ADD
          </button>
        </Link>
      );
    }

    return (
      <div onClick={this.onClick} className="carousel-container">
        <img
          src={`http://image.tmdb.org/t/p/w185/${poster_path}`}
          alt=""
          className="carousel-image"
        />

        <p className="vote">{vote_average}</p>
        <div className="carousel-info">
          <Link
            to="/details"
            style={{
              textDecoration: "none"
            }}
          >
            <h4 className="carousel-info-title">
              {shortTitle} ({year})
            </h4>
          </Link>
          {likeButton}
        </div>
      </div>
    );
  }
}

TrendingMovie.propTypes = {
  auth: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
  setDetailsMovie: PropTypes.func.isRequired,
  addMovieToCollection: PropTypes.func.isRequired,
  removeMovieFromCollection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,

  movies: state.movies
});

export default connect(
  mapStateToProps,
  { setDetailsMovie, addMovieToCollection, removeMovieFromCollection }
)(TrendingMovie);
