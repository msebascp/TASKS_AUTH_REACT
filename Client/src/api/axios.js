import axios from "axios";

const instance = axios.create({
  baseURL: "http://backend:4000/api",
  withCredentials: true
});

export default instance;
