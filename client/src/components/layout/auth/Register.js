import React, { Component } from "react";

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
  };

  render() {
    return (
      <form className="mx-auto col-md-6 mt-5" onSubmit={this.onSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label>Your name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={this.state.name}
            placeholder="Enter email"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control "
            value={this.state.email}
            placeholder="Enter email"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            placeholder="Password"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm password</label>
          <input
            type="password"
            name="password2"
            className="form-control"
            value={this.state.password2}
            placeholder="Password"
            onChange={this.onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Register;
