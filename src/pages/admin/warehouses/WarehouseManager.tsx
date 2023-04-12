import React from 'react';

import ManagerPageTable from '../components/ManagerPageTable';

const WarehouseManager = () => {
  return (
    <>
      <div>Warehouse Manager</div>
      <ManagerPageTable target="warehouses" />
    </>
  );
};

export default WarehouseManager;
