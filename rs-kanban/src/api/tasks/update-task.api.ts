import { APIService } from '../../services';
import { Task, TaskRequestForUpdate } from '../../models';

export const updateTask = (
  boardId: string,
  columnId: string,
  taskId: string,
  body: TaskRequestForUpdate
) => {
  const url = `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  return APIService.put<Task, TaskRequestForUpdate>(url, body);
};
