import React from 'react';
import styles from './Logo.module.css';
const Logo = () => {
  return (
    <>
      <div className={styles.logoBox}>
        <div className={styles.logoImage}></div>
        <div>
          <h4 className={styles.logoText}>HANDY DANDY</h4>
          <p className={styles.logoMoto}>Knowledge is power</p>
        </div>
      </div>
    </>
  );
};

export default Logo;
