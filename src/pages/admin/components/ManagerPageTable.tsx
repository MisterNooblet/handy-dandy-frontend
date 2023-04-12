import React, { useState, useEffect } from 'react';
import { advancedRequest } from 'utils/apiData';
import DataTable from './DataTable';

const ManagerPageTable = ({ target }: { target: string }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      const result = await advancedRequest(target);
      setItems(result);
    };

    getItems();
  }, [target]);
  return (
    <>
      <DataTable data={items} source={null} />
    </>
  );
};

export default ManagerPageTable;
