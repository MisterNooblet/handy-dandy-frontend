import React from 'react';
import ManagerPageTable from '../components/ManagerPageTable';

const MaterialManager = () => {
  return (
    <>
      <div>Material Manager</div>
      <ManagerPageTable target="items?type=material" />
    </>
  );
};

export default MaterialManager;
