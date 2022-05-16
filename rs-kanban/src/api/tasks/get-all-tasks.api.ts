import { APIService } from '../../services';
import { CardTask } from '../../components/cardTask/interface/cardTaskProps';

export const getAllTasks = (boardId: string, columnId: string) => {
  const url = `/boards/${boardId}/columns/${columnId}/tasks`;
  return APIService.get<CardTask[]>(url);
};
