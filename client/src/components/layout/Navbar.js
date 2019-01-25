import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Components
import Logo from "../common/Logo";

// Import actions
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            MyPage
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="/"
            onClick={this.onLogoutClick}
            className="nav-link text-white"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav  ml-auto">
        <li className="nav-item">
          <Link
            className="nav-link text-white"
            to="/register"
            aria-disabled="true"
          >
            Sign up
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link text-white" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-transparent">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
            <Logo />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          />
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
