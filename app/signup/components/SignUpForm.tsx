'use client';
import { signUp } from '@/utils/apiAuth';
import { validateEmail } from '@/utils/emailValidator';
import { FormError, SignupFormData } from '@/utils/models';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import AutoComplete from '@/components/AutoComplete';
import { COUNTRIES } from '@/utils/constants';

const SignUpForm = () => {
  const [errorMsg, setErroMsg] = useState({} as FormError);

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
        setErroMsg({
          message: 'Email already exists in our database',
          code: 3,
        });
      }
    } else if (firstName && firstName.length === 0) {
      setErroMsg({ message: 'Please enter a first name', code: 1 });
    } else if (lastName && lastName.length === 0) {
      setErroMsg({ message: 'Please enter a last name', code: 2 });
    } else if (!validMail) {
      setErroMsg({ message: 'Please enter a valid email', code: 3 });
    } else if (password && password.length <= 8) {
      setErroMsg({
        message: 'Password too short enter atleast 8 characters',
        code: 4,
      });
    } else if (password !== password2) {
      setErroMsg({ message: 'Wrong password confirmation entered', code: 5 });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formIconBox">
        <FaUserPlus className="formIcon" />
      </div>
      <h1>{errorMsg.message ? errorMsg.message : 'Sign up'}</h1>
      <label>
        First name:
        <input
          name="firstName"
          id="firstName"
          autoFocus
          title="Please enter your First name"
          type="text"
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          id="lastName"
          title="Please enter your Last name"
          type="text"
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          id="email"
          title="Please enter a valid Email : example@somedomain.com"
          type="email"
        />
      </label>
      <AutoComplete array={COUNTRIES} />
      <label>
        Password:
        <input
          name="password"
          id="password"
          title="Please enter a password atleast 8 characters long"
          type="password"
        />
      </label>
      <label>
        Confirm Password:
        <input
          name="password2"
          id="password2"
          title="Please confirm your password"
          type="password"
        />
      </label>
      <button type="submit">SIGN UP</button>
      <div>
        <Link href="/login">Already have an account? Sign in</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
