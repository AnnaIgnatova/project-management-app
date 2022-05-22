import './style.scss';
import { Link, Navigate } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { Button } from '@mui/material';
import { useAppSelector } from '../../store';
import { GetValueToken } from '../../utils/getValueToken';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../langSwitcher';

export const StickyHeader: React.FC = () => {
  const { t } = useTranslation();
  const { isToken, token } = useAppSelector((state) => state.tokenReduser);
  GetValueToken();

  const signOut = () => {
    document.cookie = `Token=${token}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    <Navigate to={Routes.welcome} />;
    // location.reload();
  };

  const getBtnHeader = () => {
    if (isToken) {
      if (location.pathname === '/') {
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
          <LangSwitcher />
          <Button variant="contained">{t('header.btnNewBoard')}</Button>

          <Link to={Routes.editProfile}>
            <Button variant="contained">{t('header.btnEditProfile')}</Button>
          </Link>
          <Button variant="contained" color="error" onClick={signOut}>
            {t('header.btnSignOut')}
          </Button>
        </>
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
