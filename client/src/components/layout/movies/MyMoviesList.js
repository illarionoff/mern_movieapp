import React, { Component } from "react";

// Components
import MyMovie from "./MyMovie";

import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

export class MyMoviesList extends Component {
  render() {
    const { myMovies } = this.props.movies;

    if (myMovies.length <= 0) {
      return <React.Fragment>No Movies yet</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          {myMovies.map(movie => (
            <MyMovie movie={movie} key={movie.movie_id} />
          ))}
        </React.Fragment>
      );
    }
  }
}

MyMoviesList.propTypes = {
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(MyMoviesList);
