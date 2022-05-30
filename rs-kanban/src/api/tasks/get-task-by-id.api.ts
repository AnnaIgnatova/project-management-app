import { APIService } from '../../services';
import { TaskById } from '../../models';

export const getTaskById = (boardId: string, columnId: string, taskId: string) => {
  const url = `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  return APIService.get<TaskById>(url);
};
