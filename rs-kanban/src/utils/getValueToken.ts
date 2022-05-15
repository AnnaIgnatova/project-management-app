import { useDispatch } from 'react-redux';
import { getToken } from '../features/token/tokenSlice';

import jwtDecode from 'jwt-decode';
import { createUser } from '../features/user/userSlice';

interface decodeToken {
  iat: number;
  login: string;
  userId: string;
}

export const GetValueToken = () => {
  const dispatch = useDispatch();
  const name = 'Token';
  const matched = document.cookie.includes(name);
  const token = document.cookie.replace(/Token=/g, '');
  const decode: decodeToken = jwtDecode(token);
  const userData = {
    id: decode.userId,
    login: decode.login,
  };
  dispatch(getToken(matched));
  dispatch(createUser(userData));
};
