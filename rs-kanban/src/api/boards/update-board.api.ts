import { APIService } from '../../services';
import { Board, BoardRequest } from '../../models';

export const updateBoard = (id: string, body: BoardRequest) => {
  const url = `/boards/${id}`;
  return APIService.put<Board, BoardRequest>(url, body);
};
