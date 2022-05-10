import './style.scss';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../types/routes';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

export const StickyHeader: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);

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
    <div className={`container ${isSticky ? 'stickyHeader' : ''}`}>
      <div className="btnsContainer">
        <NavLink to={Routes.editProfile} className="textDecorationNone">
          <Button variant="contained">profile</Button>
        </NavLink>
        <Button variant="contained">logout</Button>
        <Button variant="contained">+ board</Button>
      </div>
    </div>
  );
};
