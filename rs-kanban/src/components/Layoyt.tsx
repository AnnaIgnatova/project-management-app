import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

const token = true;

export const Layout = () => {
  return (
    <>
      {token && <Header />}
      <Outlet />
      <Footer />
    </>
  );
};
