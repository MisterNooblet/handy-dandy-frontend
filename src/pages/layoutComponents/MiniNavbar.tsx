import React from 'react';
import styles from './MiniNavbar.module.css';
import { Link } from 'react-router-dom';

interface LinkObj {
  name: string;
  path: string;
}
const MiniNavbar = ({ links }: { links: LinkObj[] }) => {
  return (
    <div className={styles.navMini}>
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniNavbar;
