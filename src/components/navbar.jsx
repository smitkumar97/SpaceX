import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    const { user } = this.props;
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark  bg-dark ">
          <Link className="navbar-brand mb-0 h1" to="/">
            SpaceX Dashboard
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="signing">
                  Sign-In
                </NavLink>
              </li> */}
              {!user && (
                <React.Fragment>
                  <NavLink className="nav-link" to="/users/logging">
                    Sign In
                  </NavLink>
                  <NavLink className="nav-link" to="/users/register">
                    Register
                  </NavLink>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <NavLink className="nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                  <NavLink className="nav-link" to="/signout">
                    Logout
                  </NavLink>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
      </>
    );
  }
}
export default Navbar;
