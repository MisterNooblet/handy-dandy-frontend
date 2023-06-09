export interface User {
  id: string;
  fullName: string;
  email: string;
  toolbox: Toolbox;
  role: string;
  pfp: string;
  favourites: string[];
  country: string;
}
export interface UserExtended {
  id: string;
  fullName: string;
  email: string;
  role: string;
  pfp: string;
  favourites: string[];
  toolbox: {
    materials: Item[];
    tools: Item[];
  };
}
export interface Toolbox {
  materials: string[];
  tools: string[];
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
  id?: string;
}
export interface ItemForm {
  title: string;
  description: string;
  image: File;
  properties: string[];
  parentDoc: string;
  type: string;
}
export interface Item {
  id: string;
  title: string;
  image: string;
  description: string;
  properties: string[];
  type: string;
  parentDoc: string;
}

export interface CategorySelect {
  id: string;
  title: string;
  parentDoc: {
    title: string;
  };
}

export interface ArticleForm {
  title: string;
  articleBody: string;
  summary: string;
  author: string;
  difficulty: number;
  toolbox: {
    materials: string[];
    tools: string[];
  };
  parentDoc: string;
  image: File;
}
export interface ArticleResponse {
  id: string;
  title: string;
  articleBody: string;
  summary: string;
  author: UserExtended;
  difficulty: number;
  toolbox: {
    materials: Item[];
    tools: Item[];
  };
  parentDoc: CategoryForm;
  upvotes: string[];
  image: string;
  updatedAt: string;
  createdAt: string;
}

export interface ArticlePreview {
  id: string;
  title: string;
  articleBody: string;
  summary: string;
  upvotes: string[];
  updatedAt: string;
  createdAt: string;
  image: string;
  author: string;
  difficulty: number;
  toolbox: {
    materials: Item[];
    tools: Item[];
  };
  parentDoc: { title: string };
}
