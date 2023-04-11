export interface User {
  id: string;
  fullName: string;
  email: string;
  toolbox: Toolbox;
  role: string;
  pfp: string;
  favourites: string[];
}

export interface Toolbox {
  materials: Item[];
  tools: Item[];
}

export interface Item {
  id: string;
  title: string;
  image: string;
  description: string;
  type: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  country: string;
}

export interface FormError {
  message: string | null;
  code: number | null;
}
