import { Task } from '../../../models/task.type';
export interface CardTaskProps {
  value: Task;
}
export interface FilesCardTask {
  taskId: string;
  file: string;
}

export interface CardTask {
  description: string;
  files: FilesCardTask[];
  id: string;
  order: number;
  title: string;
  userId: string;
}
