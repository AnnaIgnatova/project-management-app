/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export const Registration: React.FC = () => {
  const [validName, setValidName] = useState(true);
  const [validLogin, setValidLogin] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validButton, setValidButton] = useState(true);

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2) {
      setValidName(true);
    } else {
      setValidName(false);
    }
    setButton();
  };

  const setLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) {
      setValidLogin(true);
    } else {
      setValidLogin(false);
    }
    setButton();
  };

  const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 5) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
    setButton();
  };

  const setButton = () => {
    console.log(validName, validLogin, validPassword);
    if (!validName && !validLogin && !validPassword) {
      setValidButton(false);
    } else {
      setValidButton(true);
    }
  };

  return (
    <div className="container-registration">
      <div className="registration__title">Registration</div>
      <Box component="form" className="registration__form">
        <div className="registration__form-input">
          <TextField
            required
            id="outlined-required"
            label="Name"
            placeholder="Enter your name"
            error={validName}
            onChange={setName}
            helperText="Enter min 2 symbols"
          />
        </div>
        <div className="registration__form-input">
          <TextField
            required
            id="outlined-required"
            label="Login"
            placeholder="Enter your login"
            error={validLogin}
            onChange={setLogin}
            helperText="Enter min 3 symbols"
          />
        </div>
        <div className="registration__form-input">
          <TextField
            required
            id="outlined-required"
            label="Password"
            placeholder="Enter your password"
            type="password"
            error={validPassword}
            onChange={setPassword}
            helperText="Enter min 6 symbols"
          />
        </div>
        <Button className="registration__form-btn" variant="contained" disabled={validButton}>
          Click
        </Button>
      </Box>
    </div>
  );
};
