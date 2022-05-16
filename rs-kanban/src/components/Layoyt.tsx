import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { StickyHeader } from './StickyHeader';

export const Layout = () => {
  return (
    <>
      <StickyHeader />
      <Outlet />
      <Footer />
    </>
  );
};
