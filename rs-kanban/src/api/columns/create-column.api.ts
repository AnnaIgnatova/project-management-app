import { APIService } from '../../services';
import { Column, ColumnRequest } from '../../models';

export const createColumn = (boardId: string, body: ColumnRequest) => {
  const url = `/boards/${boardId}/columns`;
  return APIService.post<Column, ColumnRequest>(url, body);
};
