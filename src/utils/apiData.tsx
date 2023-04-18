import axios, { AxiosInstance } from 'axios';
import { getAuthCookie } from './cookieManager';
import { ArticleForm, CategoryForm, ItemForm, SignupFormData } from './models';

const warehouses: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}warehouses`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const items: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}items`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const categories: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}categories`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const articles: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}articles`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const subCategories: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_PATH}subcategories`,
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
articles.interceptors.request.use((config) => {
  const authToken = getAuthCookie();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
items.interceptors.request.use((config) => {
  const authToken = getAuthCookie();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

categories.interceptors.request.use((config) => {
  const authToken = getAuthCookie();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
subCategories.interceptors.request.use((config) => {
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

export const createCategory = async (category: CategoryForm) => {
  const result = await categories.post(`/`, category, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.data;
};
export const createItem = async (item: ItemForm) => {
  const result = await items.post(`/`, item, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.data;
};
export const createArticle = async (item: ArticleForm) => {
  const result = await articles.post(`/`, item, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.data;
};
export const createSubCategory = async (category: CategoryForm) => {
  const result = await subCategories.post(`/`, category, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.data;
};
export const getCategories = async (type: string) => {
  const result = await categories.get(`/?type=${type}`);
  return result.data.data;
};
export const getSubCategories = async (parentDoc: string) => {
  const result = await subCategories.get(`/?parentDoc=${parentDoc}`);
  return result.data.data;
};
export const getItems = async (parentDoc: string) => {
  const result = await items.get(`/?parentDoc=${parentDoc}`);
  return result.data.data;
};
export const getArticles = async (parentDoc: string) => {
  const result = await articles.get(`/?parentDoc=${parentDoc}`);
  return result.data.data;
};
export const getItem = async (id: string) => {
  const result = await items.get(`/${id}`);
  return result.data.data;
};
export const getArticle = async (id: string) => {
  const result = await articles.get(`/${id}`);
  return result.data.data;
};
export const getTopArticles = async () => {
  const result = await articles.get(`/top`);
  return result.data.data;
};
export const signUp = async (user: SignupFormData) => {
  const result = await axios.post(`${import.meta.env.VITE_API_BASE_PATH}auth/register`, user);
  return result.data.token;
};
export const setUpvotes = async (data: { userId: string; articleId: string }) => {
  const result = await articles.put('/', data);
  return result.data.data;
};
