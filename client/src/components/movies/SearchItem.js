import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { onSearchSubmit, setMoviesLoading } from "../../actions/movieActions";

import SearchContent from "./SearchContent";

// Spinner
import Loading from "../common/Loading";

class SearchItem extends Component {
  state = {
    searchItem: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const title = this.state.searchItem;
    this.props.setMoviesLoading();
    this.props.onSearchSubmit(title);
  };

  render() {
    return (
      <section className="section-search">
        <h2 className="section-search-header">Search movie</h2>
        <div className="section-search-body">
          <form className="form-search">
            <input
              className="input-search"
              type="text"
              placeholder="Search movie"
              name="searchItem"
              value={this.state.searchItem}
              onChange={this.onChange}
            />

            <button
              type="submit"
              className="button-search"
              onClick={this.onSubmit}
            >
              <i className="fas fa-search" />
            </button>
          </form>
          {this.props.movies.loading ? (
            <Loading />
          ) : (
            <>
              <SearchContent searchMovies={this.props.movies.searchMovies} />
            </>
          )}
        </div>
      </section>
    );
  }
}

SearchItem.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  setMoviesLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movies: state.movies,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { onSearchSubmit, setMoviesLoading }
)(SearchItem);
