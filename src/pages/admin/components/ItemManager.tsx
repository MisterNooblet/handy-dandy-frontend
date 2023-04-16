import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CategorySelect } from 'utils/models';
import ManagerPageTable from './ManagerPageTable';
import SubcategorySelector from './SubcategorySelector';
import ItemForm from './ItemForm';

const ItemManager = ({ type }: { type: string }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelect | string>('');
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <div>{type} Manager</div>
          <SubcategorySelector
            target="subcategories"
            query={`type=${type}s`}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {typeof selectedCategory !== 'string' && <ItemForm target={selectedCategory} type={type} />}
        </Box>
        {typeof selectedCategory !== 'string' ? (
          <ManagerPageTable target="items" query={`parentDoc=${selectedCategory.id}`} />
        ) : (
          <ManagerPageTable target="items" query={`type=${type}`} />
        )}
      </Box>
    </>
  );
};

export default ItemManager;
