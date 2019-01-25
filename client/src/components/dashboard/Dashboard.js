import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

// Components
import MyMoviesList from "../layout/movies/MyMoviesList";
import DashboardHeader from "./DashboardHeader";

// Spinner
import Loading from "../common/Loading";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    e.preventDefault();
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Loading />;
    } else {
      // Check if profile empty
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="section-dashboard-body">
            <h2 className="section-dashboard-header">Your Movie Collection</h2>
            <MyMoviesList />
          </div>
        );
      } else {
        // User has no profile
        dashboardContent = null;
      }
    }

    return (
      <section className="section-dashboard">
        <div>
          <DashboardHeader user={user} onDeleteClick={this.onDeleteClick} />

          {dashboardContent}
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  movies: state.movies
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
