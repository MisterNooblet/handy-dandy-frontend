import React from 'react';
import { useParams } from 'react-router-dom';
import AuthorApplicationStepper from './components/AuthorApplicationStepper';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { AuthState } from 'store/authSlice';
import { Typography } from '@mui/material';
import API from 'utils/apiConfig';
import Error404 from 'pages/Error404/Error404';

const Application = () => {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;
  const { type } = useParams();
  const [hasntApplied, setHasntApplied] = React.useState<number | boolean>(0);
  const [thankYou, setThankYou] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkIfUserApplied = async () => {
      const response = await API.get(`applications/author/user/${user?.id}`);
      if (response.data.data.length === 0 || !response.data.data.find((app: { status: string }) => app.status === 'pending')) {
        setHasntApplied(true);
      } else {
        setHasntApplied(false);
      }
    };
    checkIfUserApplied();
  }, [user?.id]);
  if (type !== 'author' && type !== 'craftsman') {
    return <Error404 />;
  }
  if (thankYou) {
    return <Typography variant='h3'>Thank you for applying! We will review your application and you will be notified by email.</Typography>;
  }
  if (type === 'author') {
    if (user?.role === 'admin' || user?.role === 'author') {
      return <Typography variant='h3'>Looks like you already have the author role.</Typography>;
    }
  }

  if (type === 'author') {
    if (hasntApplied === false) {
      return <Typography variant='h3'>Looks like you have already applied. We will review your application and you will get contacted by email.</Typography>;
    }
  }
  return <>{user && type === 'author' && hasntApplied === true && <AuthorApplicationStepper setThankYou={setThankYou} />}</>;
};

export default Application;
