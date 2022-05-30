import { Route, Routes as RoutesWrapper } from 'react-router-dom';
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
import { NotFound } from './pages/NotFound';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const AppRouter = () => {
  const isToken = useAppSelector((state) => state.tokenReducer.isToken);
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <RoutesWrapper>
          <Route path={Routes.welcome} element={<Layout />}>
            <Route index element={<Welcome />} />
            {isToken ? (
              <>
                <Route path={Routes.main} element={<Main />} />
                <Route path={Routes.user} element={<User />} />
                <Route path={Routes.board} element={<BoardPage />} />
                <Route path={Routes.editProfile} element={<EditProfile />} />
                <Route path={Routes.login || Routes.registration} element={<Main />} />
              </>
            ) : (
              <>
                <Route path={Routes.login} element={<Login />} />
                <Route path={Routes.registration} element={<Registration />} />
                <Route
                  path={Routes.main || Routes.user || Routes.board || Routes.editProfile}
                  element={<Welcome />}
                />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Route>
        </RoutesWrapper>
      </DndProvider>
    </>
  );
};

export default AppRouter;
