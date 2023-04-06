import React from 'react';
import styles from './ProfileBox.module.css';
import { BsFillPersonFill } from 'react-icons/Bs';
const ProfileBox = () => {
  return (
    <div>
      <div title="Open Settings" className={styles.pfpBox}>
        <BsFillPersonFill />
      </div>
    </div>
  );
};

export default ProfileBox;
