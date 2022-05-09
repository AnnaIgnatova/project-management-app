import { APIService } from '../../services';
import { SignIn, Token } from './../../models';

export const createToken = (body: SignIn) => {
  const url = '/signin';
  return APIService.postSign<Token, SignIn>(url, body);
};
