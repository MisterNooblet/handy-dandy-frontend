'use client';
import { signUp } from 'utils/apiAuth';
import { validateEmail } from 'utils/emailValidator';
import { SignupFormData } from 'utils/models';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoComplete from 'components/AutoComplete';
import { COUNTRIES } from 'data/countries';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { signUpFormData } from 'data/formFields';
import FormInput from 'components/FormInput';
import { setMessage, UiState } from 'store/uiSlice';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { message } = useSelector((state: RootState) => state.ui) as UiState;
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName') as string;
    const lastName = data.get('lastName') as string;
    const email = data.get('email') as string;
    const country = data.get('Country') as string;
    const password = data.get('password') as string;
    const password2 = data.get('password2') as string;
    const validMail = validateEmail(email);

    if (
      validMail &&
      password2 === password &&
      password.length >= 8 &&
      password2.length >= 8 &&
      firstName.length > 0 &&
      lastName.length > 0
    ) {
      const newUser: SignupFormData = {
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        password,
        email,
        country,
      };
      try {
        await signUp(newUser);
        navigate('/login');
      } catch (error) {
        dispatch(
          setMessage({
            message: 'Email already exists in our database',
            code: 3,
            severity: 'error',
          })
        );
      }
    } else if (firstName && firstName.length === 0) {
      dispatch(
        setMessage({
          message: 'Please enter a first name',
          code: 1,
          severity: 'error',
        })
      );
    } else if (lastName && lastName.length === 0) {
      dispatch(
        setMessage({
          message: 'Please enter a last name',
          code: 2,
          severity: 'error',
        })
      );
    } else if (!validMail) {
      dispatch(
        setMessage({
          message: 'Please enter a valid email',
          code: 3,
          severity: 'error',
        })
      );
    } else if (password && password.length <= 8) {
      dispatch(
        setMessage({
          message: 'Password too short enter atleast 8 characters',
          code: 4,
          severity: 'error',
        })
      );
    } else if (password !== password2) {
      dispatch(
        setMessage({
          message: 'Wrong password confirmation entered',
          code: 5,
          severity: 'error',
        })
      );
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
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <AccountCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {message ? message.message : 'Sign up'}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: '400px' }}>
        <Grid container spacing={2}>
          {signUpFormData.map((field, idx) => (
            <Grid key={field.name} item xs={12} sm={idx < 2 ? 6 : 12}>
              <FormInput
                label={field.label}
                name={field.name}
                title={field.title}
                fieldIdx={idx + 1}
                type={field.type}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <AutoComplete label={'Country'} array={COUNTRIES} />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={'/login'}>
              <Typography color={'blue'}>Already have an account? Sign in</Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpForm;
