import styles from './style.module.scss';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../types/routes';
import { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  const isStickyFn = () => {
    window.scrollY > 0 ? setIsSticky(true) : setIsSticky(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isStickyFn);
    return () => {
      window.removeEventListener('scroll', isStickyFn);
    };
  });

  return (
    <div className={isSticky ? styles.container + ' ' + styles.stickyHeader : styles.container}>
      <div className={styles.btnsContainer}>
        <NavLink to={Routes.editProfile}>
          <button>edit profile</button>
        </NavLink>
        <button>logout</button>
        <button>+ new board</button>
        <select name="localization" defaultValue="EN">
          <option value="EN">EN</option>
          <option value="RU">RU</option>
        </select>
      </div>
    </div>
  );
};
