import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { StickyHeader } from './StickyHeader';

const token = true;

export const Layout = () => {
  return (
    <>
      {token && <StickyHeader />}
      <Outlet />
      <Footer />
    </>
  );
};
