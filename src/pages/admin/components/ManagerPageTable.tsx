import React, { useState, useEffect } from 'react';
import { advancedRequest } from 'utils/apiData';
import DataTable from './DataTable';

const ManagerPageTable = ({ target, query }: { target: string; query?: string }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      if (query) {
        const result = await advancedRequest(target, query);
        setItems(result);
      } else {
        const result = await advancedRequest(target);
        setItems(result);
      }
    };

    getItems();
  }, [query, target]);
  return (
    <>
      <DataTable data={items} source={'items'} />
    </>
  );
};

export default ManagerPageTable;
