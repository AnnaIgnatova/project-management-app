import { APIService } from '../../services';
import { Board } from '../../models';

export const getAllBoards = () => {
  const url = '/boards';
  return APIService.get<Board[]>(url);
};
