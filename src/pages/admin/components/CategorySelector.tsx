import { MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { MyObject } from 'utils/models';

interface Variant {
  [key: string]: MyObject[];
}
const CategorySelector = ({
  variants,
  setSelectedCategory,
  selectedCategory,
}: {
  variants: Variant[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
}) => {
  const handleSelectChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
  };
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {variants.map((variant) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} key={Object.keys(variant)[0]}>
            <Typography textAlign={'center'}>{`${Object.keys(variant)[0]}:`}</Typography>
            <Select
              sx={{ minWidth: 170 }}
              value={selectedCategory}
              onChange={handleSelectChange}
              label="Select Category"
            >
              <MenuItem value="">Select Category</MenuItem>

              {Object.values(variant)[0].map((category: MyObject) => {
                return (
                  <MenuItem key={category.title} value={category.id}>
                    {category.title}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        );
      })}
    </Box>
  );
};

export default CategorySelector;
