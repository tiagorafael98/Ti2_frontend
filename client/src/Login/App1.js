import React, { Component } from "react";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";

import SignInForm from "./Paginas/SignInForm";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="App__Aside" />
          <div className="App__Form">
            <h1>Sign In</h1>
            <Route path="/" component={SignInForm} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
