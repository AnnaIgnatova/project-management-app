import { APIService } from '../../services';

export const deleteBoard = (id: string) => {
  const url = `/boards/${id}`;
  return APIService.delete(url);
};
