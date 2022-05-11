import { APIService } from '../../services';
import { BoardById } from '../../models';

export const getBoardById = (id: string) => {
  const url = `/boards/${id}`;
  return APIService.get<BoardById>(url);
};
