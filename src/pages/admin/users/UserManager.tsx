import React from 'react';
import ManagerPageTable from '../components/ManagerPageTable';

const UserManager = () => {
  return (
    <>
      <div>User Manager</div>
      <ManagerPageTable target="users" />
    </>
  );
};

export default UserManager;
