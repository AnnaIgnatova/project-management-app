import './style.scss';
import { Link } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { Button } from '@mui/material';
import { useAppSelector } from '../../store';
import { GetValueToken } from '../../utils/getValueToken';
import { useTranslation } from 'react-i18next';

export const StickyHeader: React.FC = () => {
  const { t } = useTranslation();
  const token = useAppSelector((state) => state.tokenReduser.isToken);
  GetValueToken();

  const getBtnHeader = () => {
    if (token) {
      return (
        <Link to={Routes.main}>
          <Button className="main-btn" variant="contained">
            {t('header.btnMain')}
          </Button>
        </Link>
      );
    }

    return (
      <>
        <Link to={Routes.login}>
          <Button className="login-btn" variant="contained">
            {t('header.btnLogin')}
          </Button>
        </Link>
        <Link to={Routes.registration}>
          <Button className="singup-btn" variant="contained">
            {t('header.btnSignUp')}
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
