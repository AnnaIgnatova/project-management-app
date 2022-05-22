import { APIService } from '../../services';
import { Column, ColumnUpdate } from '../../models';

export const updateColumn = (boardId: string, columnId: string, body: ColumnUpdate) => {
  const url = `/boards/${boardId}/columns/${columnId}`;
  return APIService.put<Column, ColumnUpdate>(url, body);
};
