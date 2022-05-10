import { APIService } from '../../services';
import { User, SignUp } from './../../models';

export const createAccount = (body: SignUp) => {
  const url = '/signup';
  return APIService.post<User, SignUp>(url, body);
};
