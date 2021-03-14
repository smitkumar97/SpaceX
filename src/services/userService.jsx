import { Apibackend } from "../config.json";
import axios from "axios";

const apiEndpoint = Apibackend + "/auth";

export function register(user) {
  return axios.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
