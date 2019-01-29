import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount } from "../../actions/authActions";
import { getMyMovies } from "../../actions/movieActions";

// Components
import MyMoviesList from "../movies/MyMoviesList";
import DashboardHeader from "./DashboardHeader";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getMyMovies();
  }

  onDeleteClick = e => {
    e.preventDefault();
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;

    return (
      <section className="section-dashboard">
        <div>
          <DashboardHeader user={user} onDeleteClick={this.onDeleteClick} />
          <h2 className="section-dashboard-header">Your Movie Collection</h2>
          <div className="section-dashboard-body">
            <MyMoviesList />
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
  getMyMovies: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  { getMyMovies, deleteAccount }
)(Dashboard);
