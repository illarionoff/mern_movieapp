import React, { Component } from "react";

// Components
import MyMovie from "./MyMovie";

import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

export class MyMoviesList extends Component {
  render() {
    const { myMovies } = this.props.movies;
    return (
      <React.Fragment>
        {myMovies.map(movie => (
          <MyMovie movie={movie} key={movie.movie_id} />
        ))}
      </React.Fragment>
    );
  }
}

MyMoviesList.propTypes = {
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(MyMoviesList);
