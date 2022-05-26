import { Task } from '../../../models/task.type';
import { CardTask } from './../../../components/cardTask/interface/cardTaskProps';

export interface ColumnProps {
  value: {
    id: string;
    title: string;
    order: string;
    tasks: CardTask[];
  };
}

export interface ColData {
  tasks: Task[];
}

export interface BoardData {
  columns: ColData[];
}

export interface DropItem {
  id: string;
}
