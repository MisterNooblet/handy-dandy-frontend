import axios, { AxiosInstance } from 'axios';
import { getAuthCookie } from './cookieManager';
import { SignupFormData } from './models';

const auth: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}auth`,
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
export const fetchUserExtended = async () => {
  const result = await auth.get(`/current-user-extended`);
  return result.data.data;
};

export const logIn = async (email: string, password: string) => {
  const result = await axios.post(`${import.meta.env.VITE_API_BASE_PATH}auth/login`, {
    email,
    password,
  });
  return result.data.token;
};

interface UserUpdateDetails {
  fullName?: string;
  email?: string;
  pfp?: string;
  toolbox?: {
    materials?: string[];
    tools?: string[];
  };
}

export const updateUserData = async (data: UserUpdateDetails) => {
  const result = await auth.put(`/update-details`, data);
  return result.data.data;
};

export const signUp = async (user: SignupFormData) => {
  const result = await axios.post(`${import.meta.env.VITE_API_BASE_PATH}auth/register`, user);
  return result.data.token;
};
