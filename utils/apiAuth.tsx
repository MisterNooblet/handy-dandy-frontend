import { API_BASE_PATH } from './constants';
import axios from 'axios';

export const fetchUser = async () => {
  const result = await axios.get(`${API_BASE_PATH}auth/current-user`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmM4NTk0MjBjOGEwNTVjZTgwYTc5NCIsImlhdCI6MTY4MDYzOTM4MSwiZXhwIjoxNjgzMjMxMzgxfQ.meu4jb_89ajEGYSIcsiha-Q1mI5Az-BiYW9kftwIWEw',
    },
  });
  return result.data.data;
};
