import { TaskData } from '../../task/interfaces/taskProps';

export interface BoardProps {
  data: BoardData;
}

export interface BoardData {
  title: string;
  tasks: TaskData[];
}
