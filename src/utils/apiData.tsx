import { API_BASE_PATH } from 'data/constants';
import axios, { AxiosInstance } from 'axios';
import { getAuthCookie } from './cookieManager';
import { SignupFormData } from './models';

const warehouses: AxiosInstance = axios.create({
  baseURL: `${API_BASE_PATH}warehouses`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const queries: AxiosInstance = axios.create({
  baseURL: `${API_BASE_PATH}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

warehouses.interceptors.request.use((config) => {
  const authToken = getAuthCookie();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

queries.interceptors.request.use((config) => {
  const authToken = getAuthCookie();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export const fetchActiveWarehouse = async () => {
  const result = await warehouses.get(`/?isActive=true`);
  return result.data.data;
};

export const advancedRequest = async (path: string, query?: string | undefined) => {
  const result = await queries.get(`${API_BASE_PATH}${path}${query ? '/' + query : ''}`);
  return result.data.data;
};

export const signUp = async (user: SignupFormData) => {
  const result = await axios.post(`${API_BASE_PATH}auth/register`, user);
  return result.data.token;
};
