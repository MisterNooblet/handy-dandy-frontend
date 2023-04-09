'use client';
import React, { useState } from 'react';
import styles from './ProfileBox.module.css';
import { BsFillPersonFill } from 'react-icons/bs';
import NavList from './NavList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AuthState } from '@/store/authSlice';
const settings = [{ name: 'Profile', path: '/profile' }];

const loginSettings = [
  { name: 'Login', path: '/login' },
  { name: 'Signup', path: '/signup' },
];

const ProfileBox = () => {
  const user = useSelector((state: RootState) => state.auth) as AuthState;
  const [listOpen, setListOpen] = useState(false);

  const handleOpenList = () => {
    setListOpen(true);
  };

  return (
    <div>
      <div
        title="Open Settings"
        className={styles.pfpBox}
        onClick={handleOpenList}
      >
        {!user.user?.id && <BsFillPersonFill />}
        {user.user?.fullName &&
          user.user?.pfp === 'none' &&
          user.user?.fullName[0]}
        {listOpen && (
          <NavList
            paths={user.user?.id ? settings : loginSettings}
            setListOpen={setListOpen}
            isLogout={user.user?.id ? true : false}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileBox;
