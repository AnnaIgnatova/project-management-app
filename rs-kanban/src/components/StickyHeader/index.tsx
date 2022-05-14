import './style.scss';
import { Link } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { Button } from '@mui/material';

export const StickyHeader: React.FC = () => {
  const getCookie = () => {
    const name = 'Token';
    const matched = document.cookie.includes(name);
    return matched;
  };

  const getBtnHeader = () => {
    if (getCookie()) {
      return (
        <Link to={Routes.main}>
          <Button className="main-btn" variant="contained">
            Go to Main Page
          </Button>
        </Link>
      );
    }

    return (
      <>
        <Link to={Routes.login}>
          <Button className="login-btn" variant="contained">
            Login
          </Button>
        </Link>
        <Link to={Routes.registration}>
          <Button className="singup-btn" variant="contained">
            Sign up
          </Button>
        </Link>
      </>
    );
  };

  console.log(getCookie());

  return (
    <div className="container-header">
      <div className="sticky-header">
        <div className="container-btn">{getBtnHeader()}</div>
      </div>
    </div>
  );
};
