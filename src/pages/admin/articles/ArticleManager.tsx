import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import { CategorySelect } from 'utils/models';
import ManagerPageTable from '../components/ManagerPageTable';
import SubcategorySelector from '../components/SubcategorySelector';
import ArticleForm from './components/ArticleForm';

const ArticleManager = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelect | string>('');
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  return (
    <>
      <div>Article Manager</div>
      <SubcategorySelector
        target="subcategories"
        query="type=articles"
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      {typeof selectedCategory !== 'string' && <ArticleForm target={selectedCategory} />}
      {typeof selectedCategory !== 'string' && user?.role === 'admin' ? (
        <ManagerPageTable target="articles" query={`parentDoc=${selectedCategory.id}`} />
      ) : user?.role === 'admin' ? (
        <ManagerPageTable target="articles" />
      ) : null}
    </>
  );
};

export default ArticleManager;
