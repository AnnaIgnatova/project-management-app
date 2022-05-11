import { APIService } from '../../services';

export const deleteColumn = (boardId: string, columnId: string) => {
  const url = `/boards/${boardId}/columns/${columnId}`;
  return APIService.delete(url);
};
