import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";

class Login extends Component {
  state = {
    email: "",
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
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user, this.props.history);
    // axios
    //   .post("/api/users/login", user)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
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
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.email
            })}
            name="email"
            placeholder="Enter email"
            onChange={this.onChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.password
            })}
            name="password"
            placeholder="Password"
            onChange={this.onChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default connect(
  null,
  loginUser
)(withRouter(Login));
