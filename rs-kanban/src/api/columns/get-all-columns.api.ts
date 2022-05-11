import { APIService } from '../../services';
import { Column } from '../../models';

export const getAllColumns = (boardId: string) => {
  const url = `/boards/${boardId}/columns`;
  return APIService.get<Column[]>(url);
};
