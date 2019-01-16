import React, { Component } from "react";

import PropTypes from "prop-types";

// TextFieldGroup
import TextFieldGroup from "../../common/TextFieldGroup";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };

  render() {
    const { errors } = this.state;
    return (
      <form
        noValidate
        className="mx-auto col-md-6 mt-5"
        onSubmit={this.onSubmit}
      >
        <h2>Login</h2>
        <TextFieldGroup
          name="email"
          value={this.state.email}
          type="email"
          placeholder="Email"
          onChange={this.onChange}
          error={errors.email}
          labels="Email address"
        />
        <TextFieldGroup
          name="password"
          value={this.state.password}
          type="password"
          placeholder="Password"
          onChange={this.onChange}
          error={errors.password}
          labels="Your password"
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
