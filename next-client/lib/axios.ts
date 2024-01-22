import axios from "axios";

const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(config);

export default instance;
