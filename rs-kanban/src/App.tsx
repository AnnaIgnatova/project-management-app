import { Route, Routes as RoutesWrapper } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { Board } from './pages/Board';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { User } from './pages/User';
import { Welcome } from './pages/Welcome';
import { Registration } from './pages/Registration';
import { Routes } from './types/routes';

const AppRouter = () => {
  return (
    <RoutesWrapper>
      <Route path={Routes.welcome} element={<Welcome />} />
      <Route path={Routes.main} element={<Main />} />
      <Route path={Routes.login} element={<Login />} />
      <Route path={Routes.registration} element={<Registration />} />
      <Route path={Routes.user} element={<User />} />
      <Route path={Routes.board} element={<Board />} />
      <Route path={Routes.notFound} element={<NotFound />} />
    </RoutesWrapper>
  );
};

export default AppRouter;
