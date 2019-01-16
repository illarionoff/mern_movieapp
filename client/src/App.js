import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
import Login from "./components/layout/auth/Login";
import Register from "./components/layout/auth/Register";

// CSS
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Main} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
