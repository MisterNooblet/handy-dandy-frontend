import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { AuthState } from 'store/authSlice';
import AccordionPiece from './AccordionPiece';
import PasswordForm from './PasswordForm';

export default function ControlledAccordions() {
  const { user } = useSelector((state: RootState) => state.auth) as AuthState;

  const ACCORDION_DATA = [
    { key: 'Full Name', value: user?.fullName, summary: <Typography>Were working on it....</Typography> },
    { key: 'Photo', value: 'Update Photo', summary: <Typography>Were working on it....</Typography> },
    { key: 'Email', value: user?.email, summary: <Typography>Were working on it....</Typography> },
    { key: 'Password', value: 'Update Password', summary: <PasswordForm /> },
  ];
  return (
    <>
      {ACCORDION_DATA.map((data) => (
        <AccordionPiece key={data.key} value={data.value} title={data.key} summary={data.summary} />
      ))}
    </>
  );
}
