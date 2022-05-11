import { File } from '../models';

export interface TaskRequest {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface TaskRequestForUpdate extends TaskRequest {
  boardId: string;
  columnId: string;
}

export interface TasksInColumn extends TaskRequest {
  id: string;
  files: File[];
}

export interface Task extends TaskRequestForUpdate {
  id: string;
}

export interface TaskById extends Task {
  files: File[];
}
