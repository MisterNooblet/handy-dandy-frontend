import React from 'react';
import { useParams } from 'react-router';

const MasterDocManager = () => {
  const params = useParams();
  console.log(params);
  return <div>MasterDocManager</div>;
};

export default MasterDocManager;
