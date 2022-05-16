import { FilesCardTask } from '../components/cardTask/interface/cardTaskProps';

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
  files: FilesCardTask[];
}

export interface Task extends TaskRequestForUpdate {
  id: string;
}

export interface TaskById extends Task {
  files: FilesCardTask[];
}
