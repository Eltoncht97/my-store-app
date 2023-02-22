import axios from "axios";

const pukisApi = axios.create({
  // baseURL: "https://pukis.herokuapp.com/api",
  baseURL: 'http://localhost:3000/api'
});

pukisApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  return config;
});

export default pukisApi;
