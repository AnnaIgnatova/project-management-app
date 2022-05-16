import './style.scss';
import { Box, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createAccount } from '../../api/authorization/create-account.api';
import { Link } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { useTranslation } from 'react-i18next';

export const Registration: React.FC = () => {
  const { t } = useTranslation();
  const [validName, setValidName] = useState<boolean>(true);
  const [validLogin, setValidLogin] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [validButton, setValidButton] = useState<boolean>(true);
  const [forms, setForm] = useState({
    name: '',
    login: '',
    password: '',
  });

  useEffect(() => {
    const isValid = !validName && !validLogin && !validPassword;
    setValidButton(!isValid);
  }, [validName, validLogin, validPassword]);

  const changeHandler = (event: React.ChangeEvent) => {
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    setForm({ ...forms, [name]: value });
    switch (name) {
      case 'name':
        setName(event);
        break;
      case 'login':
        setLogin(event);
        break;
      case 'password':
        setPassword(event);
        break;
      default:
        break;
    }
  };

  const setName = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const isValidName = value.length < 2;
    setValidName(isValidName);
  };

  const setLogin = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const isValidLogin = value.length < 3;
    setValidLogin(isValidLogin);
  };

  const setPassword = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const isValidPassword = value.length <= 6;
    setValidPassword(isValidPassword);
  };

  const reqisterHandler = () => {
    createAccount(forms);
  };

  return (
    <div className="container-registration">
      <div className="registration__title">{t('pages.registration.title')}</div>
      <Box component="form" className="registration__form">
        <div className="registration__form-input">
          <TextField
            required
            name="name"
            id="outlined-required"
            label={t('pages.registration.name.label')}
            placeholder={t('pages.registration.name.placeholder')}
            error={validName}
            onChange={changeHandler}
            helperText={t('pages.registration.name.helperText')}
          />
        </div>
        <div className="registration__form-input">
          <TextField
            required
            name="login"
            id="outlined-required"
            label={t('pages.registration.login.label')}
            placeholder={t('pages.registration.login.placeholder')}
            error={validLogin}
            onChange={changeHandler}
            helperText={t('pages.registration.login.helperText')}
          />
        </div>
        <div className="registration__form-input">
          <TextField
            required
            name="password"
            id="outlined-required"
            label={t('pages.registration.password.label')}
            placeholder={t('pages.registration.password.placeholder')}
            type="password"
            error={validPassword}
            onChange={changeHandler}
            helperText={t('pages.registration.password.helperText')}
          />
        </div>
        <Link to={Routes.login} className="registration__form-link">
          <Button
            className="registration__form-btn"
            variant="contained"
            disabled={validButton}
            onClick={reqisterHandler}
          >
            {t('pages.registration.button')}
          </Button>
        </Link>
      </Box>
    </div>
  );
};
