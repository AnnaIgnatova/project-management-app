import { APIService } from '../../services';
import { SignIn, Token } from './../../models';

export const createToken = (body: SignIn) => {
  const url = '/signin';
  return APIService.post<Token, SignIn>(url, body);
};
