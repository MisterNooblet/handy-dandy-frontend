import axios, { AxiosInstance } from 'axios';

const API: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}/`,
  withCredentials: true,
  timeout: 10000,
});

export default API;
