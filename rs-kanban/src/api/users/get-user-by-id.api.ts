import { APIService } from '../../services';
import { User } from '../../models';

export const getUserById = (id: string) => {
  const url = `/users/${id}`;
  return APIService.get<User>(url);
};
