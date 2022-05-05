import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Auth } from './pages/Auth';
import { Board } from './pages/Board';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { User } from './pages/User';
import { Welcome } from './pages/Welcome';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/user" element={<User />} />
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
