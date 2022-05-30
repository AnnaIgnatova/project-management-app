import { APIService } from '../../services';
import { TaskById } from '../../models';

export const getAllTasks = (boardId: string, columnId: string) => {
  const url = `/boards/${boardId}/columns/${columnId}/tasks`;
  return APIService.get<TaskById[]>(url);
};
