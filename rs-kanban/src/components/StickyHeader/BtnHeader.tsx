import { Button } from '@mui/material';
import { LangSwitcher } from '../langSwitcher';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { Routes } from '../../models/routes';
import { GetValueToken } from '../../services/utils/getValueToken';
import { PinkButton, PeachButton } from './customMUI';

interface BtnHeaderProps {
  open: () => void;
}

export const BtnHeader: React.FC<BtnHeaderProps> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isToken, token } = useAppSelector((state) => state.tokenReducer);
  GetValueToken();

  const signOut = () => {
    document.cookie = `Token=${token}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    location.reload();
  };

  const goToMain = () => {
    navigate('/main');
  };

  if (isToken) {
    if (location.pathname === '/') {
      return (
        <>
          <LangSwitcher />
          <Button className="main-btn" variant="contained" onClick={goToMain}>
            {t('header.btnMain')}
          </Button>
        </>
      );
    }

    return (
      <>
        <LangSwitcher />
        <Button className="new-board-btn" variant="contained" onClick={props.open}>
          {t('header.btnNewBoard')}
        </Button>

        <Link to={Routes.editProfile}>
          <Button className="edit-profile-btn" variant="contained">
            {t('header.btnEditProfile')}
          </Button>
        </Link>
        <Button className="signout-btn" variant="contained" color="error" onClick={signOut}>
          {t('header.btnSignOut')}
        </Button>
      </>
    );
  }

  return (
    <>
      <LangSwitcher />
      <Link to={Routes.login}>
        <PinkButton className="login-btn" variant="contained">
          {t('header.btnLogin')}
        </PinkButton>
      </Link>
      <Link to={Routes.registration}>
        <PeachButton className="singup-btn" variant="contained">
          {t('header.btnSignUp')}
        </PeachButton>
      </Link>
    </>
  );
};
