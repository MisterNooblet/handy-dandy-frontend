import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CategorySelect } from 'utils/models';
import ManagerPageTable from '../components/ManagerPageTable';
import SubcategorySelector from '../components/SubcategorySelector';
import ItemForm from './components/ItemForm';

const ToolManager = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelect | string>('');
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <div>Tool Manager</div>
          <SubcategorySelector
            target="subcategories"
            query="type=tools"
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {typeof selectedCategory !== 'string' && <ItemForm target={selectedCategory} type={'tool'} />}
        </Box>
        {typeof selectedCategory !== 'string' ? (
          <ManagerPageTable target="items" query={`parentDoc=${selectedCategory.id}`} />
        ) : (
          <ManagerPageTable target="items" query="type=tool" />
        )}
      </Box>
    </>
  );
};

export default ToolManager;
