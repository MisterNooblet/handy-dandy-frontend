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

export interface UiMessage {
  message: string | null;
  code: number | null;
  severity: 'success' | 'error' | 'info' | 'warning';
}
export interface MyObject {
  [key: string]: string;
}

export interface CategoryForm {
  title: string;
  description: string;
  image: File;
  target: string;
  parentDoc: string;
  docModel: string | null;
}

export interface CategorySelect {
  id: string;
  title: string;
}
