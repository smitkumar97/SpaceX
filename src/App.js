import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logoutForm";
import auth from "./services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <Router>
        <Navbar user={user} />
        <div className="container">
          <Route path="/" exact component={Dashboard} />
          <Route path="/users/register" exact component={RegisterForm}></Route>
          <Route path="/users/logging" exact component={LoginForm}></Route>
          <Route path="/signout" exact component={Logout}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
