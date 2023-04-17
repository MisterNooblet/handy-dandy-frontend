import React, { useState } from 'react';
import { CategorySelect } from 'utils/models';
import ManagerPageTable from '../components/ManagerPageTable';
import SubcategorySelector from '../components/SubcategorySelector';
import ArticleForm from './components/ArticleForm';

const ArticleManager = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelect | string>('');
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
      {typeof selectedCategory !== 'string' ? (
        <ManagerPageTable target="articles" query={`parentDoc=${selectedCategory.id}`} />
      ) : (
        <ManagerPageTable target="articles" />
      )}
    </>
  );
};

export default ArticleManager;
