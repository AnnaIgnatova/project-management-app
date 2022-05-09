import { APIService } from '../../services';
import { Column, ColumnRequest } from '../../models';

export const updateColumn = (boardId: string, columnId: string, body: ColumnRequest) => {
  const url = `/boards/${boardId}/columns/${columnId}`;
  return APIService.put<Column, ColumnRequest>(url, body);
};
