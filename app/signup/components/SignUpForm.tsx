import { fetchCountries } from '@/store/apiSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SignUpForm = () => {
  const [errorMsg, setErroMsg] = React.useState(null);

  const api = useSelector((state) => state.api);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const country = data.get('Country');
    const password = data.get('password');
    const password2 = data.get('password2');
    const invalidMail = validateEmail(email);
    if (
      !invalidMail &&
      password2 === password &&
      password.length >= 8 &&
      password2.length >= 8 &&
      firstName.length > 0 &&
      lastName.length > 0
    ) {
      const result = await fireBaseAuth.signUp(
        email,
        password,
        firstName,
        lastName,
        country
      );
      if (result.uid !== undefined) {
        navigate('/login');
      } else {
        setErroMsg({
          message: 'Email already exists in our database',
          code: 3,
        });
      }
    } else if (firstName.length === 0) {
      setErroMsg({ message: 'Please enter a first name', code: 1 });
    } else if (lastName.length === 0) {
      setErroMsg({ message: 'Please enter a last name', code: 2 });
    } else if (invalidMail) {
      setErroMsg({ message: 'Please enter a valid email', code: 3 });
    } else if (password.length <= 8) {
      setErroMsg({
        message: 'Password too short enter atleast 8 characters',
        code: 4,
      });
    } else if (password !== password2) {
      setErroMsg({ message: 'Wrong password confirmation entered', code: 5 });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="formIconBox">
        <BsPersonFillLock className="formIcon" />
      </div>
      <h1>Log In</h1>
      <label>
        Email address:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="false"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Login</button>
      <div>
        <Link href="/reset-password">Forgot Password?</Link>
        <Link href="/signup">Don't have an account? Sign Up</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
