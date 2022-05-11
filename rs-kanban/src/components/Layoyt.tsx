import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
<<<<<<< HEAD
import { StickyHeader } from './StickyHeader';

const token = true;
=======
import { Header } from './Header';
>>>>>>> develop

export const Layout = () => {
  return (
    <>
<<<<<<< HEAD
      {token && <StickyHeader />}
=======
      <Header />
>>>>>>> develop
      <Outlet />
      <Footer />
    </>
  );
};
