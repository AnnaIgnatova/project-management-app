import { APIService } from '../../services';
import { User } from '../../models';

export const getAllUsers = () => {
  const url = '/users';
  return APIService.get<User[]>(url);
};
