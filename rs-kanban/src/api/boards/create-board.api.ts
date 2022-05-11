import { APIService } from '../../services';
import { Board, BoardRequest } from '../../models';

export const createBoard = (body: BoardRequest) => {
  const url = '/boards';
  return APIService.post<Board, BoardRequest>(url, body);
};
