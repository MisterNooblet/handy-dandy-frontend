import React, { useState } from 'react';
import { CategorySelect } from 'utils/models';
import ManagerPageTable from '../components/ManagerPageTable';
import SubcategorySelector from '../components/SubcategorySelector';

const ToolManager = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelect | string>('');
  return (
    <>
      <div>Tool Manager</div>
      <SubcategorySelector
        target="subcategories"
        query="type=tools"
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {typeof selectedCategory !== 'string' ? (
        <ManagerPageTable target="items" query={`parentDoc=${selectedCategory.id}`} />
      ) : (
        <ManagerPageTable target="items" query="type=tool" />
      )}
    </>
  );
};

export default ToolManager;
