import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Link to="/dashboard">
        <button className="button button-red">Profile</button>
      </Link>
    );

    const guestLinks = (
      <React.Fragment>
        <Link to="/login">
          <button className="button button-red">Login</button>
        </Link>
        <Link to="/register">
          <button className="button button-green">Register</button>
        </Link>
      </React.Fragment>
    );

    return (
      <header>
        <div className="header-title">
          <h1>
            <span className="header-title-primary">MyMovies</span>
            <span className="header-title-secondary">
              find your favourite movies
            </span>
          </h1>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
