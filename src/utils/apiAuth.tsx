import API from './apiConfig';
import { SignupFormData } from './models';

export const fetchUser = async () => {
  const result = await API.get(`auth/current-user`);
  return result.data.data;
};
export const fetchUserExtended = async () => {
  const result = await API.get(`auth/current-user-extended`);
  return result.data.data;
};

export const logIn = async (email: string, password: string) => {
  const result = await API.post(`${import.meta.env.VITE_API_BASE_PATH}auth/login`, {
    email,
    password,
  });
  return result.data.token;
};

interface UserUpdateDetails {
  fullName?: string;
  email?: string;
  pfp?: string;
  currentPassword?: string;
  newPassword?: string;
  toolbox?: {
    materials?: string[];
    tools?: string[];
  };
  favourites?: string[];
}

export const updateUserData = async (data: UserUpdateDetails) => {
  const result = await API.put(`auth/update-details`, data);
  return result.data.data;
};
export const updateUserPassword = async (data: UserUpdateDetails) => {
  const result = await API.put(`auth/update-password`, data);
  return result.data.token;
};

export const signUp = async (user: SignupFormData) => {
  const result = await API.post(`${import.meta.env.VITE_API_BASE_PATH}auth/register`, user);
  return result.data.token;
};
