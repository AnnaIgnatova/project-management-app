import { Route, Routes as RoutesWrapper } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { BoardPage } from './pages/BoardPage';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { User } from './pages/User';
import { Welcome } from './pages/Welcome';
import { Registration } from './pages/Registration';
import { Routes } from './types/routes';
import { Layout } from './components/Layoyt';
import { EditProfile } from './pages/EditProfile';

const AppRouter = () => {
  return (
    <>
      <RoutesWrapper>
        <Route path={Routes.welcome} element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path={Routes.main} element={<Main />} />
          <Route path={Routes.login} element={<Login />} />
          <Route path={Routes.registration} element={<Registration />} />
          <Route path={Routes.user} element={<User />} />
          <Route path={Routes.board} element={<BoardPage />} />
          <Route path={Routes.editProfile} element={<EditProfile />} />
          <Route path={Routes.notFound} element={<NotFound />} />
        </Route>
      </RoutesWrapper>
    </>
  );
};

export default AppRouter;
