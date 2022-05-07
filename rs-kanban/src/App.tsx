import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { Board } from './pages/Board';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { User } from './pages/User';
import { Welcome } from './pages/Welcome';
import { Registration } from './pages/Registration';
import { RoutesPath } from './types/routes';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutesPath.welcome} element={<Welcome />} />
      <Route path={RoutesPath.main} element={<Main />} />
      <Route path={RoutesPath.login} element={<Login />} />
      <Route path={RoutesPath.registration} element={<Registration />} />
      <Route path={RoutesPath.user} element={<User />} />
      <Route path={RoutesPath.board} element={<Board />} />
      <Route path={RoutesPath.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
