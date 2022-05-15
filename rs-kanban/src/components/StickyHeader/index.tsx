import './style.scss';
import { Link } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { Button } from '@mui/material';
import { useAppSelector } from '../../store';
import { GetValueToken } from '../../utils/getValueToken';

export const StickyHeader: React.FC = () => {
  const token = useAppSelector((state) => state.tokenReduser.isToken);
  GetValueToken();

  const getBtnHeader = () => {
    if (token) {
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

  return (
    <div className="container-header">
      <div className="sticky-header">
        <div className="container-btn">{getBtnHeader()}</div>
      </div>
    </div>
  );
};
