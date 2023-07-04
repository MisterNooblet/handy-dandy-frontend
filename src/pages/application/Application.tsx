import Container from '@mui/material/Container';
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
      if (
        response.data.data.length === 0 ||
        !response.data.data.find((app: { status: string }) => app.status === 'pending')
      ) {
        setHasntApplied(true);
      } else {
        setHasntApplied(false);
      }
    };
    checkIfUserApplied();
  }, [user?.id]);
  if (type !== 'author' && type !== 'craftsman') {
    return (
      <Container
        maxWidth="xl"
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <Error404 />
      </Container>
    );
  }
  if (thankYou) {
    return (
      <Container
        maxWidth="xl"
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="h3">
          Thank you for applying! We will review your application and you will be notified by email.
        </Typography>
      </Container>
    );
  }
  if (type === 'author') {
    if (user?.role === 'admin' || user?.role === 'author') {
      return (
        <Container
          maxWidth="xl"
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="h3">Looks like you already have the author role.</Typography>
        </Container>
      );
    }
  }

  if (type === 'author') {
    if (hasntApplied === false) {
      return (
        <Container
          maxWidth="xl"
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="h3">
            Looks like you have already applied. We will review your application and you will get contacted by email.
          </Typography>
        </Container>
      );
    }
  }
  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1 }}>
      {user && type === 'author' && hasntApplied === true && <AuthorApplicationStepper setThankYou={setThankYou} />}
    </Container>
  );
};

export default Application;
