import axios from "axios";

const pukisApi = axios.create({
  baseURL: process.env.VUE_APP_PUKIS_API_URL
});

pukisApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  return config;
});

export default pukisApi;
