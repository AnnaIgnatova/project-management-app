import './style.scss';
import { Button, TextField, Box, Container } from '@mui/material';
import { useState } from 'react';
import { createToken } from '../../api/authorization/create-token.api';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { ONE_DAY } from './constant';
import { LoginFormEvent } from './interface/LoginForm';
import { useTranslation } from 'react-i18next';
import { BackLink } from './../../components/backLink';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [forms, setForm] = useState({
    login: '',
    password: '',
  });

  const changeHandler = (event: LoginFormEvent) => {
    setForm({ ...forms, [event.target.name]: event.target.value });
  };

  const reqisterHandler = () => {
    const date = new Date(Date.now() + ONE_DAY).toUTCString();
    const answer = createToken(forms);
    answer.then((resolve) => {
      document.cookie = `Token=${resolve.token}; expires=${date}`;
      navigate(Routes.main);
      location.reload();
    });
  };

  return (
    <Container maxWidth="xl" className="boardPage">
      <BackLink />
      <div className="container-login">
        <div className="login__title">{t('pages.login.title')}</div>
        <Box component="form" className="login__form">
          <div className="login__form-input">
            <TextField
              required
              name="login"
              id="outlined-required"
              label={t('pages.login.loginLabel')}
              placeholder={t('pages.login.loginPlaceholder')}
              onChange={changeHandler}
            />
          </div>
          <div className="login__form-input">
            <TextField
              required
              name="password"
              id="outlined-required"
              label={t('pages.login.passwordLabel')}
              placeholder={t('pages.login.passwordPlaceholder')}
              type="password"
              onChange={changeHandler}
            />
          </div>
          <Button className="login__form-btn" variant="contained" onClick={reqisterHandler}>
            {t('pages.registration.button')}
          </Button>
        </Box>
      </div>
    </Container>
  );
};
