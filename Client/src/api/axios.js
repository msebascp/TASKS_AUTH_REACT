import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api", //172.18.0.3
  withCredentials: true
});

export default instance;
