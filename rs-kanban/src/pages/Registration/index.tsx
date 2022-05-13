/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { createAccount } from '../../api/authorization/create-account.api';
import { Link } from 'react-router-dom';
import { Routes } from '../../models/routes';

export const Registration: React.FC = () => {
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
    if (!validName && !validLogin && !validPassword) {
      setValidButton(false);
    } else {
      setValidButton(true);
    }
  }, [validName, validLogin, validPassword]);

  const changeHandler = (event: { target: { name: string; value: string } }) => {
    setForm({ ...forms, [event.target.name]: event.target.value });
  };

  const setName = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    if (value.length < 2) {
      setValidName(true);
    } else {
      setValidName(false);
    }
  };

  const setLogin = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    if (value.length < 3) {
      setValidLogin(true);
    } else {
      setValidLogin(false);
    }
  };

  const setPassword = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    if (value.length <= 6) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const reqisterHandler = async () => {
    try {
      createAccount(forms);
    } catch (error: any) {}
  };

  return (
    <div className="container-registration">
      <div className="registration__title">Registration</div>
      <Box component="form" className="registration__form">
        <div className="registration__form-input">
          <TextField
            required
            name="name"
            id="outlined-required"
            label="Name"
            placeholder="Enter your name"
            error={validName}
            onChange={(event) => {
              setName(event);
              changeHandler(event);
            }}
            helperText="Enter min 2 symbols"
          />
        </div>
        <div className="registration__form-input">
          <TextField
            required
            name="login"
            id="outlined-required"
            label="Login"
            placeholder="Enter your login"
            error={validLogin}
            onChange={(event) => {
              setLogin(event);
              changeHandler(event);
            }}
            helperText="Enter min 3 symbols"
          />
        </div>
        <div className="registration__form-input">
          <TextField
            required
            name="password"
            id="outlined-required"
            label="Password"
            placeholder="Enter your password"
            type="password"
            error={validPassword}
            onChange={(event) => {
              setPassword(event);
              changeHandler(event);
            }}
            helperText="Enter more than 6 characters"
          />
        </div>
        <Link to={Routes.login}>
          <Button
            className="registration__form-btn"
            variant="contained"
            disabled={validButton}
            onClick={reqisterHandler}
          >
            Click
          </Button>
        </Link>
      </Box>
    </div>
  );
};
