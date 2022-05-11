import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { StickyHeader } from './StickyHeader';
import { Header } from './Header';

const token = true;

export const Layout = () => {
  return (
    <>
      {token && <StickyHeader />}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
