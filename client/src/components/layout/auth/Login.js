import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <form className="mx-auto col-md-6 mt-5">
        <h2>Login</h2>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control "
            name="name"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
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
