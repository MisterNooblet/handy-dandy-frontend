'use client';
import { signUp } from '@/utils/apiAuth';
import { validateEmail } from '@/utils/emailValidator';
import { FormError, SignupFormData } from '@/utils/models';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import AutoComplete from '@/components/AutoComplete';
import { COUNTRIES } from '@/data/countries';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { signUpFormData } from '@/data/formFields';
import FormInput from '@/components/FormInput';

const SignUpForm = () => {
  const [errorMsg, setErrorMsg] = useState<FormError>({} as FormError);
  const router = useRouter();

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
        router.push('/login');
      } catch (error) {
        setErrorMsg({
          message: 'Email already exists in our database',
          code: 3,
        });
      }
    } else if (firstName && firstName.length === 0) {
      setErrorMsg({ message: 'Please enter a first name', code: 1 });
    } else if (lastName && lastName.length === 0) {
      setErrorMsg({ message: 'Please enter a last name', code: 2 });
    } else if (!validMail) {
      setErrorMsg({ message: 'Please enter a valid email', code: 3 });
    } else if (password && password.length <= 8) {
      setErrorMsg({
        message: 'Password too short enter atleast 8 characters',
        code: 4,
      });
    } else if (password !== password2) {
      setErrorMsg({ message: 'Wrong password confirmation entered', code: 5 });
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
        <FaUserPlus />
      </Avatar>
      <Typography component="h1" variant="h5">
        {errorMsg ? errorMsg.message : 'Sign up'}
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
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
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
            <Link href={'/login'}>
              <Typography color={'blue'}>Already have an account? Sign in</Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpForm;
