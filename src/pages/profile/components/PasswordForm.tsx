import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import FormInput from 'components/FormInput';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from 'store/uiSlice';
import { updateUserPassword } from 'utils/apiAuth';

const FORM_DATA = [
  { label: 'Current Password', type: 'password', name: 'currentPassword', title: 'Enter your current password' },
  { label: 'New Password', type: 'password', name: 'newPassword', title: 'Enter your new password' },
  { label: 'Confirm Password', type: 'password', name: 'confirmPassword', title: 'Confirm your new password' },
];

const PasswordForm = () => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const currentPassword = data.get('currentPassword') as string;
    const newPassword = data.get('newPassword') as string;
    const confirmPassword = data.get('confirmPassword') as string;
    if (currentPassword && currentPassword.length >= 8 && newPassword.length >= 8 && confirmPassword === newPassword) {
      const data = { currentPassword, newPassword };
      try {
        const response = await updateUserPassword(data);
        if (response) {
          dispatch(
            setMessage({
              message: `Password successfully updated`,
              severity: 'success',
            })
          );
          if (formRef.current) {
            formRef.current.reset();
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else if (!currentPassword || currentPassword.length < 8) {
      dispatch(
        setMessage({
          message: `Please provide your current password atleast 8 characters long`,
          code: 1,
          severity: 'error',
        })
      );
    } else if (!newPassword || newPassword.length < 8) {
      dispatch(
        setMessage({ message: `Please provide a new password atleast 8 characters long`, code: 2, severity: 'error' })
      );
    } else if (newPassword !== confirmPassword) {
      dispatch(setMessage({ message: `Passwords do not match`, code: 3, severity: 'error' }));
    }
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit} ref={formRef}>
      {FORM_DATA.map((data, idx) => (
        <FormInput
          key={data.name}
          label={data.label}
          type={data.type}
          name={data.name}
          title={data.title}
          fieldIdx={idx + 1}
        />
      ))}
      <Button type={'submit'} variant={'contained'} fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default PasswordForm;
