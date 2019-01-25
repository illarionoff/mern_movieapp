import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Spinner
import Loading from "../common/Loading";

class Header extends Component {
  render() {
    const { profile, loading } = this.props.profile;
    let headerContent;
    if (profile === null || loading) {
      headerContent = <Loading />;
    } else {
      // Check if profile empty
      if (Object.keys(profile).length > 0) {
        headerContent = (
          <React.Fragment>
            <Link to="/edit-profile">
              <button className="button button-green">edit</button>
            </Link>

            <button
              className="button button-red"
              onClick={this.props.onDeleteClick}
            >
              delete
            </button>
          </React.Fragment>
        );
      } else {
        // User has no profile
        headerContent = (
          <React.Fragment>
            <Link to="/create-profile">
              <button className="button button-green">Create profile</button>
            </Link>
          </React.Fragment>
        );
      }
    }
    return (
      <header>
        <div className="header-title">
          <h1>
            <span className="header-title-primary">{this.props.user.name}</span>
            <span className="header-title-secondary">
              find your favourite movies
            </span>
          </h1>
          {headerContent}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Header);
