import React, { Component } from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../../validation/is-empty";
import { Redirect } from "react-router-dom";
import {
  addMovieToCollection,
  removeMovieFromCollection
} from "../../../actions/movieActions";

import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

export class MovieDetails extends Component {
  back = () => {
    this.props.history.push(`/`);
  };

  render() {
    if (isEmpty(this.props.movies.detailsMovie)) {
      return <Redirect to="/" />;
    } else {
      const { isAuthenticated } = this.props.auth;
      const {
        backdrop_path,
        id,
        original_title,
        overview,
        poster_path,
        release_date,
        title,
        vote_average
      } = this.props.movies.detailsMovie;

      const { myMovies } = this.props.movies;
      const year = release_date.slice(0, 4);

      let componentButtons;

      if (isAuthenticated) {
        if (myMovies.some(movie => parseInt(movie.movie_id) === id)) {
          componentButtons = (
            <button
              onClick={() => this.props.removeMovieFromCollection(id)}
              className="button button-red"
            >
              Remove
            </button>
          );
        } else {
          componentButtons = (
            <button
              onClick={() =>
                this.props.addMovieToCollection(this.props.movies.detailsMovie)
              }
              className="button button-green"
            >
              Add
            </button>
          );
        }
      } else {
        componentButtons = (
          <Link to="/login">
            <button className="button button-green">Login</button>
          </Link>
        );
      }

      return (
        <section className="section-moviedetails">
          <div className="back-button">
            <button className="button button-red" onClick={this.back}>
              Back
            </button>
          </div>

          <div
            className="section-moviedetails-back"
            style={{
              background: `url("http://image.tmdb.org/t/p/w1280/${backdrop_path}") no-repeat center center / cover`
            }}
          />
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
              {componentButtons}
            </div>
          </div>
        </section>
      );
    }
  }
}

MovieDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
  addMovieToCollection: PropTypes.func.isRequired,
  removeMovieFromCollection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  { addMovieToCollection, removeMovieFromCollection }
)(MovieDetails);
