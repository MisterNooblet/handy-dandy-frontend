import Link from 'next/link';
import styles from './NavList.module.css';
import React, { Dispatch, SetStateAction, useRef, useEffect } from 'react';

interface Paths {
  name: string;
  path: string;
}

const NavList = ({
  paths,
  setListOpen,
}: {
  paths: Paths[];
  setListOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const wrapperRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setListOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <ul ref={wrapperRef} className={styles.navList}>
      {paths.map((item) => (
        <li title={item.name} key={item.name}>
          <Link href={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavList;
