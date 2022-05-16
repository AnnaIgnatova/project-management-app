import { SignUp } from './../../models/signup.type';
import { APIService } from '../../services';
import { User } from '../../models';

export const updateUserAPI = (id: string, body: SignUp) => {
  const url = `/users/${id}`;
  return APIService.put<User, SignUp>(url, body);
};
