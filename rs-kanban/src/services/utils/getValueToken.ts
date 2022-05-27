import { useDispatch } from 'react-redux';
import { getToken, saveToken } from '../../features/token/tokenSlice';

import jwtDecode from 'jwt-decode';
import { createUser } from '../../features/user/userSlice';

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
  if (token) {
    const decode: decodeToken = jwtDecode(token);
    const userData = {
      id: decode.userId,
      login: decode.login,
    };
    dispatch(createUser(userData));
    dispatch(saveToken(token));
  }

  dispatch(getToken(matched));
};
