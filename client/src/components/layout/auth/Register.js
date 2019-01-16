import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
    this.props.registerUser(newUser);
    // axios
    //   .post("/api/users/register", newUser)
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
        <h2>Register</h2>
        <div className="form-group">
          <label>Your name</label>
          <input
            type="text"
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.name
            })}
            name="name"
            value={this.state.name}
            placeholder="Enter email"
            onChange={this.onChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.email
            })}
            value={this.state.email}
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
            name="password"
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.password
            })}
            value={this.state.password}
            placeholder="Password"
            onChange={this.onChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label>Confirm password</label>
          <input
            type="password"
            name="password2"
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.password2
            })}
            value={this.state.password2}
            placeholder="Password"
            onChange={this.onChange}
          />
          {errors.password2 && (
            <div className="invalid-feedback">{errors.password2}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
