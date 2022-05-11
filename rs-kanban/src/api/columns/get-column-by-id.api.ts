import { APIService } from '../../services';
import { ColumnById } from '../../models';

export const getColumnById = (boardId: string, columnId: string) => {
  const url = `/boards/${boardId}/columns/${columnId}`;
  return APIService.get<ColumnById>(url);
};
