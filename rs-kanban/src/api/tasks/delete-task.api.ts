import { APIService } from '../../services';

export const deleteTask = (boardId: string, columnId: string, taskId: string) => {
  const url = `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  return APIService.delete(url);
};
