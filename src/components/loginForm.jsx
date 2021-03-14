import React from "react";
import axios from "axios";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "./../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: { email: "", password: "" },
      errors: {},
    };
  }

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  // doSubmit = async (e) => {
  //   const { email, password } = this.state.data;
  //   // await auth.login(email, password);
  //   console.log("Submitted");
  //   const user = {
  //     email: email,
  //     password: password,
  //   };
  //   console.log(user);
  // };
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  // axios
  //   .post("http://localhost:5000/users/logging", user)
  //   .then((res) => console.log(res.data));

  // this.setState({
  //   email: "",
  //   password: "",
  // });
  // const { state } = this.props.location;
  // window.location = state ? state.from.pathname : "/";

  // alert("User Login successfully.");
  // window.location = "/";

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        {/* <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form> */}
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          {/* <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div> */}
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
