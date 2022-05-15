import './style.scss';
import { Button, TextField, Box } from '@mui/material';
import { useState } from 'react';
import { createToken } from '../../api/authorization/create-token.api';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { ONE_DAY } from './constant';
import { LoginFormEvent } from './interface/LoginForm';

export const Login: React.FC = () => {
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
