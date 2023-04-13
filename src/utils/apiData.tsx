import axios, { AxiosInstance } from 'axios';
import { getAuthCookie } from './cookieManager';
import { SignupFormData } from './models';

const warehouses: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}warehouses`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const libraries: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}libraries`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const queries: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

queries.interceptors.request.use((config) => {
  const authToken = getAuthCookie();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

libraries.interceptors.request.use((config) => {
  const authToken = getAuthCookie();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// queries.interceptors.request.use((config) => {
//   const authToken = getAuthCookie();
//   if (authToken) {
//     config.headers.Authorization = `Bearer ${authToken}`;
//   }
//   return config;
// });

export const fetchMasterDoc = async (target: string, id: string) => {
  if (target === 'warehouse') {
    const result = await warehouses.get(`/${id}`);
    return result.data.data;
  } else {
    const result = await libraries.get(`/${id}`);
    return result.data.data;
  }
};

export const advancedRequest = async (path: string, query?: string | undefined) => {
  const result = await queries.get(`${import.meta.env.VITE_API_BASE_PATH}${path}${query ? '?' + query : ''}`);
  return result.data.data;
};

export const signUp = async (user: SignupFormData) => {
  const result = await axios.post(`${import.meta.env.VITE_API_BASE_PATH}auth/register`, user);
  return result.data.token;
};
