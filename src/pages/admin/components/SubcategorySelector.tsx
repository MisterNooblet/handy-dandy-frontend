import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { advancedRequest } from 'utils/apiData';
import { CategorySelect } from 'utils/models';

const SubcategorySelector = ({
  target,
  query,
  setSelectedCategory,
  selectedCategory,
}: {
  target: string;
  query: string;
  selectedCategory: CategorySelect | string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategorySelect | string>>;
}) => {
  const [categories, setCategories] = useState<CategorySelect[]>([]);

  const handleSelectChange = (event: { target: { value: string } }) => {
    const selection: CategorySelect | undefined = categories.find((category) => category.id === event.target.value);

    if (selection) {
      setSelectedCategory(selection);
    } else {
      setSelectedCategory('');
    }
  };

  const fetchdata = async () => {
    const response = await advancedRequest(target, query);
    setCategories(response);
  };

  useEffect(() => {
    fetchdata();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Select
        sx={{ minWidth: 170 }}
        value={typeof selectedCategory === 'object' ? selectedCategory.id : selectedCategory}
        onChange={handleSelectChange}
        label="Select Category"
      >
        <MenuItem value="">Select Category</MenuItem>

        {categories.map((category: CategorySelect) => {
          return (
            <MenuItem key={category.title} value={category.id}>
              {category.title}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

export default SubcategorySelector;
