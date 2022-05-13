/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { createToken } from '../../api/authorization/create-token.api';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../models/routes';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [forms, setForm] = useState({
    login: '',
    password: '',
  });

  const changeHandler = (event: { target: { name: string; value: string } }) => {
    setForm({ ...forms, [event.target.name]: event.target.value });
  };

  const reqisterHandler = () => {
    const date = new Date(Date.now() + 86400e3).toUTCString();
    const answer = createToken(forms);
    answer.then((resolve) => {
      document.cookie = `Token=${resolve.token}; expires=${date}`;
      navigate(Routes.main);
    });
  };

  return (
    <div className="container-login">
      <div className="login__title">Login</div>
      <Box component="form" className="login__form">
        <div className="login__form-input">
          <TextField
            required
            name="login"
            id="outlined-required"
            label="Login"
            placeholder="Enter your login"
            onChange={changeHandler}
          />
        </div>
        <div className="login__form-input">
          <TextField
            required
            name="password"
            id="outlined-required"
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={changeHandler}
          />
        </div>
        <Button className="login__form-btn" variant="contained" onClick={reqisterHandler}>
          Click
        </Button>
      </Box>
    </div>
  );
};
