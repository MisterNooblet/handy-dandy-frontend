import { login } from '@/store/authSlice';
import { fetchUser, logIn } from '@/utils/apiAuth';
import { setAuthCookie } from '@/utils/cookieManager';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          pfp: user.pfp,
        })
      );

      router.push('/');
    } catch (error) {}
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email address:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
