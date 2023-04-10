import { login } from '@/store/authSlice';
import { fetchUser, logIn } from '@/utils/apiAuth';
import { setAuthCookie } from '@/utils/cookieManager';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserLock } from 'react-icons/fa';
import Link from 'next/link';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { FormError } from '@/utils/models';
import FormInput from '@/components/FormInput';
import { loginFormData } from '@/data/formFields';

const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState<FormError>({} as FormError);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    try {
      const response = await logIn(email, password);
      setAuthCookie(response);
      const user = await fetchUser();

      dispatch(
        login({
          id: user.id,
          toolbox: user.toolbox,
          fullName: user.fullName,
          role: user.role,
          favourites: user.favourites,
          country: user.country,
          pfp: user.pfp,
        })
      );

      router.push('/');
    } catch (error) {
      setErrorMsg({
        message: 'Wrong credentials',
        code: 1,
      });
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: '#3f3faf' }}>
        <FaUserLock />
      </Avatar>
      <Typography component="h1" variant="h5">
        {errorMsg.code ? errorMsg.message : 'Sign in'}
      </Typography>
      <Box
        component="form"
        maxWidth={'400px'}
        onSubmit={handleLogin}
        noValidate
        sx={{ mt: 1 }}
      >
        {loginFormData.map((field) => (
          <FormInput
            label={field.label}
            name={field.name}
            title={field.title}
            fieldIdx={1}
            key={field.name}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            type={field.type}
          />
        ))}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#">
              <Typography sx={{ color: 'blue' }}>Forgot password?</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href={'/register'}>
              <Typography sx={{ color: 'blue' }}>
                {"Don't have an account? Sign Up"}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginForm;
