import { Chip } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchMasterDoc } from 'utils/apiData';
import CategorySelector from './CategorySelector';
import NewCategory from './NewCategory';
interface MyObject {
  [key: string]: string;
}
interface Variant {
  [key: string]: MyObject[];
}

const MasterDocManager = ({ target }: { target: string }) => {
  const [data, setData] = useState<MyObject>({});
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchDoc = async () => {
      if (id) {
        const tempVariants = [];
        const response = await fetchMasterDoc(target, id);
        setData(response);
        for (const [key, value] of Object.entries(response)) {
          if (typeof value === 'object') {
            tempVariants.push({ [key]: response[key] });
          }
        }

        setVariants(tempVariants);
        console.log(tempVariants);
      }
    };
    fetchDoc();
  }, [id, target]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        MasterDocManager: {target.toUpperCase()} ID: {id}{' '}
        <Chip label={data.isActive ? 'Active' : 'Disabled'} color={data.isActive ? 'info' : 'error'} />
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          variants={variants}
        />
        {selectedCategory.length === 0 && <NewCategory />}
      </Box>
    </>
  );
};

export default MasterDocManager;
