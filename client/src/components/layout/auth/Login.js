import React, { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    password: ""
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
    console.log(user);
  };

  render() {
    return (
      <form className="mx-auto col-md-6 mt-5" onSubmit={this.onSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control "
            name="email"
            placeholder="Enter email"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
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

export default Login;
