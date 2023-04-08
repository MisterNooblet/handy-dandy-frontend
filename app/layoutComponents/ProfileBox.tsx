'use client';
import React, { useState } from 'react';
import styles from './ProfileBox.module.css';
import { BsFillPersonFill } from 'react-icons/Bs';
import NavList from './NavList';
const settings = [
  { name: 'Profile', path: '/profile' },
  { name: 'Logout', path: '' },
];

const loginSettings = [
  { name: 'Login', path: '/login' },
  { name: 'Signup', path: '/register' },
];

const ProfileBox = () => {
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
        <BsFillPersonFill />
        {listOpen && (
          <NavList paths={loginSettings} setListOpen={setListOpen} />
        )}
      </div>
    </div>
  );
};

export default ProfileBox;
