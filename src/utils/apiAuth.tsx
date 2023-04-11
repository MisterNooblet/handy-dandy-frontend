import { API_BASE_PATH } from 'data/constants';
import axios, { AxiosInstance } from 'axios';
import { getAuthCookie } from './cookieManager';
import { SignupFormData } from './models';

const auth: AxiosInstance = axios.create({
  baseURL: `${API_BASE_PATH}auth`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

auth.interceptors.request.use((config) => {
  const authToken = getAuthCookie();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export const fetchUser = async () => {
  const result = await auth.get(`/current-user`);
  return result.data.data;
};

export const logIn = async (email: string, password: string) => {
  const result = await axios.post(`${API_BASE_PATH}auth/login`, {
    email,
    password,
  });
  return result.data.token;
};

export const signUp = async (user: SignupFormData) => {
  const result = await axios.post(`${API_BASE_PATH}auth/register`, user);
  return result.data.token;
};
