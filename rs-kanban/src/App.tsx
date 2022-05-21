import { Navigate, Route, Routes as RoutesWrapper } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { BoardPage } from './pages/BoardPage';
import { Main } from './pages/Main';
import { User } from './pages/User';
import { Welcome } from './pages/Welcome';
import { Registration } from './pages/Registration';
import { Routes } from './models/routes';
import { Layout } from './components/Layoyt';
import { EditProfile } from './pages/EditProfile';
import { useAppSelector } from './store';

const AppRouter = () => {
  const isToken = useAppSelector((state) => state.tokenReduser.isToken);

  if (isToken) {
    return (
      <>
        <RoutesWrapper>
          <Route path={Routes.welcome} element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path={Routes.main} element={<Main />} />
            <Route path={Routes.user} element={<User />} />
            <Route path={Routes.board} element={<BoardPage />} />
            <Route path={Routes.editProfile} element={<EditProfile />} />
            <Route path="*" element={<Navigate to={Routes.main} />} />
          </Route>
        </RoutesWrapper>
      </>
    );
  }

  return (
    <>
      <RoutesWrapper>
        <Route path={Routes.welcome} element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path={Routes.login} element={<Login />} />
          <Route path={Routes.registration} element={<Registration />} />
          <Route path="*" element={<Navigate to={Routes.welcome} />} />
        </Route>
      </RoutesWrapper>
    </>
  );
};

export default AppRouter;
