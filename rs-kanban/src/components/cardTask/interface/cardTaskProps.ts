/* export interface CardTaskProps {
  value: CardTask;
} */
import { TaskType } from './ModalWindowProps';
export interface CardTaskProps {
  value: TaskType;
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
