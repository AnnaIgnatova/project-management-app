import { APIService } from '../../services';
import { User, SignUp } from './../../models';

export const createAccount = (body: SignUp) => {
  const url = '/signup';
  return APIService.postSign<User, SignUp>(url, body);
};
