import React, { Component } from "react";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// TextFieldGroup
import TextFieldGroup from "../../common/TextFieldGroup";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
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
        <TextFieldGroup
          name="name"
          value={this.state.name}
          type="text"
          placeholder="Name"
          onChange={this.onChange}
          error={errors.name}
          labels="Your name"
        />
        <TextFieldGroup
          name="email"
          value={this.state.email}
          type="email"
          placeholder="Email"
          onChange={this.onChange}
          error={errors.email}
          labels="Enter email"
        />
        <TextFieldGroup
          name="password"
          value={this.state.password}
          type="password"
          placeholder="Password"
          onChange={this.onChange}
          error={errors.password}
          labels="Enter password"
        />
        <TextFieldGroup
          name="password2"
          value={this.state.password2}
          type="password"
          placeholder="Confirm password"
          onChange={this.onChange}
          error={errors.password2}
          labels="Confirm password"
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
