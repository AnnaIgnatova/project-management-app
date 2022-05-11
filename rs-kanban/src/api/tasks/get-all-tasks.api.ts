import { APIService } from '../../services';
import { Task } from '../../models';

export const getAllTasks = (boardId: string, columnId: string) => {
  const url = `/boards/${boardId}/columns/${columnId}/tasks`;
  return APIService.get<Task[]>(url);
};
