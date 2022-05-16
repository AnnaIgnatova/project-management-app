import { APIService } from '../../services';

export const deleteUserAPI = (id: string) => {
  const url = `/users/${id}`;
  return APIService.delete(url);
};
