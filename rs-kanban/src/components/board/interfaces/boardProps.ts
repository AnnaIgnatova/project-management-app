import { TaskData } from '../../task/interfaces/taskProps';

export interface BoardProps {
  data: {
    title: string;
    tasks: TaskData[];
  };
}
