import { ArticleForm, CategoryForm, ItemForm } from './models';
import API from './apiConfig';

export const fetchMasterDoc = async (target: string, id: string) => {
  if (target === 'warehouse') {
    const result = await API.get(`warehouses/${id}`);
    return result.data.data;
  } else {
    const result = await API.get(`libraries/${id}`);
    return result.data.data;
  }
};

export const advancedRequest = async (path: string, query?: string | undefined) => {
  const result = await API.get(`${import.meta.env.VITE_API_BASE_PATH}${path}${query ? '?' + query : ''}`);
  return result.data.data;
};

export const createCategory = async (category: CategoryForm) => {
  const result = await API.post(`categories`, category, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.data;
};

export const createItem = async (item: ItemForm) => {
  const result = await API.post(`items`, item, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.data;
};

export const createArticle = async (item: ArticleForm) => {
  const result = await API.post(`articles`, item, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.data;
};

export const createSubCategory = async (category: CategoryForm) => {
  const result = await API.post(`subcategories`, category, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data.data;
};

export const getCategories = async (type: string) => {
  const result = await API.get(`categories/?type=${type}`);
  return result.data.data;
};

export const getSubCategories = async (parentDoc: string) => {
  const result = await API.get(`subcategories/?parentDoc=${parentDoc}`);
  return result.data.data;
};

export const getItems = async (parentDoc: string) => {
  const result = await API.get(`items/?parentDoc=${parentDoc}`);
  return result.data.data;
};

export const getArticles = async (parentDoc: string) => {
  const result = await API.get(`articles/?parentDoc=${parentDoc}`);
  return result.data.data;
};

export const getItem = async (id: string) => {
  const result = await API.get(`items/${id}`);
  return result.data.data;
};

export const getArticle = async (id: string) => {
  const result = await API.get(`articles/${id}`);
  return result.data.data;
};

export const getTopArticles = async () => {
  const result = await API.get(`articles/top`);
  return result.data.data;
};

export const setUpvotes = async (data: { userId: string; articleId: string }) => {
  const result = await API.put('articles', data);
  return result.data.data;
};
