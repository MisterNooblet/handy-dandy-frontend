import React from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import ProfileBox from './ProfileBox';

const pages = [
  { name: 'Tool-o-Pedia', path: '/wiki' },
  { name: 'The Library', path: '/articles' },
  { name: 'Toolbox', path: '/toolbox' },
  { name: 'Community', path: '/community' },
];

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navbar}>
        <Link title="Home" href={'/'}>
          <div className={styles.logoBox}>
            <div className={styles.logoImage}></div>
            <div>
              <h4 className={styles.logoText}>HANDY DANDY</h4>
              <p className={styles.logoMoto}>Knowledge is power</p>
            </div>
          </div>
        </Link>
        <ul className={styles.navList}>
          {pages.map((page, idx) => (
            <Link key={page.name} href={page.path}>
              <li
                title={page.name}
                className={idx === 0 ? styles.listStart : undefined}
              >
                {page.name}
              </li>
            </Link>
          ))}
        </ul>
        <ProfileBox />
      </div>
    </nav>
  );
};

export default Navbar;
