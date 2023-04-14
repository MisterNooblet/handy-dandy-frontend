import React, { useState } from 'react';
import { CategorySelect } from 'utils/models';
import ManagerPageTable from '../components/ManagerPageTable';
import SubcategorySelector from '../components/SubcategorySelector';

const MaterialManager = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelect | string>('');
  return (
    <>
      <div>Material Manager</div>
      <SubcategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        target="subcategories"
        query="type=materials"
      />
      {typeof selectedCategory !== 'string' ? (
        <ManagerPageTable target="items" query={`parentDoc=${selectedCategory.id}`} />
      ) : (
        <ManagerPageTable target="items" query="type=material" />
      )}
    </>
  );
};

export default MaterialManager;
