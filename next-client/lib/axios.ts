import axios from "axios";

const config = {
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(config);

export default instance;
