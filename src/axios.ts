import axios from "axios";
import config from "./config/config.json";

export const createAuthorizedRequest = (token = null) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.create({
    baseURL: config.apiBaseUrl,
    headers,
  });
};
