import { APIService } from '../../services';
import { Task, TaskRequest } from '../../models';

export const createTask = (boardId: string, columnId: string, body: TaskRequest) => {
  const url = `/boards/${boardId}/columns/${columnId}/tasks`;
  return APIService.post<Task, TaskRequest>(url, body);
};
