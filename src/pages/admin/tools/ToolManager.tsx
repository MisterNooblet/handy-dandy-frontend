import React from 'react';
import ManagerPageTable from '../components/ManagerPageTable';

const ToolManager = () => {
  return (
    <>
      <div>Tool Manager</div>
      <ManagerPageTable target="items?type=tool" />
    </>
  );
};

export default ToolManager;
