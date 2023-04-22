import axios, { AxiosResponse } from "axios";
import applyCaseMiddleware from "axios-case-converter";
import Cookies from "js-cookie";

const options = {
  ignoreHeaders: true
}

const client = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:3001/api/v1",
}), options);

// Request interceptor to attach authentication information to headers
client.interceptors.request.use((config) => {
  // Attach authentication tokens to header
  config.headers['access-token'] = Cookies.get('_access_token');
  config.headers['client'] = Cookies.get('_client');
  config.headers['uid'] = Cookies.get('_uid');

  return config;
});

export default client;
