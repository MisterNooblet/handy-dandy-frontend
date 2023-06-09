import { AuthState } from 'store/authSlice';
import { RootState } from 'store/store';
import greetUser from 'utils/Greet';
import { advancedRequest } from 'utils/apiData';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DataTable from './components/DataTable';
import { useState } from 'react';

const options = [
  { name: 'Articles', value: 'articles' },
  { name: 'Materials', value: 'items?type=material' },
  { name: 'Users', value: 'users' },
  { name: 'Tools', value: 'items?type=tool' },
  { name: 'Warehouses', value: 'warehouses' },
  { name: 'Libraries', value: 'libraries' },
  { name: 'Categories', value: 'categories' },
  { name: 'Subcategories', value: 'subcategories' },
  { name: 'AuthorApplications', value: 'applications/author' },
];

const Admin = () => {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const [data, setData] = useState([]);
  const [searchTarget, setSearchTarget] = useState('');
  const [searchQuery, setSeachQuery] = useState('');
  const [itemUrl, setItemUrl] = useState('');
  const handleSelectChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTarget(event.target.value);
    if (!options) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'.
    const url = options.find((item) => item.value === event.target.value).name.toLowerCase() ?? searchTarget;
    setItemUrl(url);
  };

  const fetchData = async () => {
    const result = await advancedRequest(searchTarget, searchQuery);
    setData(result);
  };

  useEffect(() => {
    if (searchTarget.length > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTarget]);

  useEffect(() => {
    if (searchTarget.length > 0 && searchQuery.length > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography>{`${greetUser()}, ${user?.fullName}`} what needs managing?</Typography>
      <Select value={searchTarget} onChange={handleSelectChange} label="Select Category">
        <MenuItem value="">Select Category</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.name} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <DataTable data={data} source={itemUrl ? itemUrl : searchTarget} />
    </Box>
  );
};

export default Admin;
