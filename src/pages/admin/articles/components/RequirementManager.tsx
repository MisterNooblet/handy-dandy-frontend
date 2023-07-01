import { FormControl, NativeSelect, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AnyAction } from '@reduxjs/toolkit';
import React, { useEffect, useReducer, SetStateAction } from 'react';
import { getCategories, getItems, getSubCategories } from 'utils/apiData';
import TransferList from './TransferList';
import { Item } from 'utils/models';

interface TransferListItem {
  id: string;
  title: string;
}
type ToolState = {
  categories: TransferListItem[];
  currentCategory: TransferListItem;
  subCategories: string[];
};

const initialState = {
  categories: [],
  currentCategory: [],
  subCategories: [],
};
function toolReducer(state: ToolState, action: AnyAction) {
  if (action.type === 'setCategories') {
    return {
      ...state,
      categories: action.categories,
      currentCategory: action.categories[0],
    };
  } else if (action.type === 'setSubCategories') {
    return {
      ...state,
      subCategories: action.subCategories,
    };
  } else if (action.type === 'setCategory') {
    return {
      ...state,
      currentCategory: action.category,
    };
  }
  throw Error('Unknown action.');
}

const RequirementManager = ({
  target,
  setNeededMaterials,
  setNeededTools,
}: {
  target: string;
  setNeededMaterials: React.Dispatch<SetStateAction<Item[]>>;
  setNeededTools: React.Dispatch<SetStateAction<Item[]>>;
}) => {
  const [categories, toolDispatch] = useReducer(toolReducer, initialState);
  const [checked, setChecked] = React.useState<Item[]>([]);
  const [left, setLeft] = React.useState<Item[]>([]);
  const [right, setRight] = React.useState<Item[]>([]);

  useEffect(() => {
    getItemCategories();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (target === 'tools') {
      setNeededTools(right);
    } else if (target === 'materials') {
      setNeededMaterials(right);
    }
  }, [right, target, setNeededMaterials, setNeededTools]);

  useEffect(() => {
    getItemSubCategories();
    //eslint-disable-next-line
  }, [categories.currentCategory]);

  const loadTools = async (subcategory: string) => {
    if (subcategory.length < 10) return;
    const result = await getItems(subcategory);
    setLeft(result);
  };

  const getItemCategories = async () => {
    if (target) {
      const categoryIds = await getCategories(target);
      toolDispatch({ type: 'setCategories', categories: categoryIds });
    }
  };

  const getItemSubCategories = async () => {
    if (target && categories.currentCategory && categories.currentCategory.length > 10) {
      const subCategoryList = await getSubCategories(categories.currentCategory);
      toolDispatch({ type: 'setSubCategories', subCategories: subCategoryList });
    }
  };

  return (
    <Box p={3} sx={{ border: '1px solid black', borderRadius: '10px' }}>
      <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl>
            <NativeSelect
              onChange={(e) => {
                toolDispatch({ type: 'setCategory', category: e.target.value });
              }}
              inputProps={{
                name: 'itemCategory',
                id: 'itemCategory',
              }}
            >
              <option value="">Select Department</option>
              {categories.categories &&
                categories.categories.map((cat: TransferListItem) => (
                  <option key={cat.title} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
            </NativeSelect>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl>
            <NativeSelect
              onChange={(e) => loadTools(e.target.value)}
              inputProps={{
                name: 'itemSubCategory',
                id: 'itemSubCategory',
              }}
            >
              <option value="">Select Category</option>
              {categories.subCategories &&
                categories.subCategories.map((cat: TransferListItem) => (
                  <option key={cat.title} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
            </NativeSelect>
          </FormControl>
        </Box>
      </Box>
      <Box p={3} sx={{ borderRadius: '10px', backgroundColor: 'background.default' }}>
        <Typography mb={2} textAlign={'center'}>
          Needed {target}
        </Typography>
        <TransferList
          setChecked={setChecked}
          setLeft={setLeft}
          setRight={setRight}
          checked={checked}
          left={left}
          right={right}
        />
      </Box>
    </Box>
  );
};

export default RequirementManager;
