import { APIService } from '../../services';

export const deleteUser = (id: string) => {
  const url = `/users/${id}`;
  return APIService.delete(url);
};
