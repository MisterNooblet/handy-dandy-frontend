import axios from 'axios';
import React from 'react';

async function testData() {
  const response = await axios.get(
    'https://real-cyan-foal-wear.cyclic.app/api/v1/subcategories/642de65687254225aacf39a9',
    {
      // query URL without using browser cache
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
  return response.data.data;
}

const page = async () => {
  const data = await testData();
  console.log(data);
  return (
    <div>
      {data.children.map((child: string) => (
        <div key={child}>{child}</div>
      ))}
    </div>
  );
};

export default page;
