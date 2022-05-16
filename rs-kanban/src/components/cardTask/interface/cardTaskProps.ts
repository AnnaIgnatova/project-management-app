/* export interface CardTaskProps {
  value: CardTask;
} */
import { TaskType } from './ModalWindowProps';
export interface CardTaskProps {
  value: TaskType;
}

interface FilesCardTask {
  taskId: string;
  file: string;
}

interface CardTask {
  description: string;
  files: FilesCardTask[];
  id: string;
  order: number;
  title: string;
  userId: string;
}
