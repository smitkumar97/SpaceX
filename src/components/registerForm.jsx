import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import axios from "axios";
// import * as userService from "../services/userService";
// import auth from "../services/authService";

class RegisterForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: { username: "", password: "", name: "", email: "" },
      errors: {},
    };
  }

  schema = {
    name: Joi.string().required().min(3).max(15).label("Name"),
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).max(12).required().label("Password"),
  };

  validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, option);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  doSubmit = async (e) => {
    const { name, username, email, password } = this.state.data;
    const user = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    console.log(user);
    axios
      .post("http://localhost:5000/users/register/", user)
      .then((res) => console.log(res.data))
      .catch((e) => {
        console.log(e);
      });
    this.setState({
      name: "",
      password: "",
    });
    alert("User Created successfully.");
    window.location = "/";
  };

  render() {
    return (
      <div>
        <br />
        <h1>Register Here</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
