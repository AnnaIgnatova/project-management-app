import { TasksInColumn } from '../models';
import { CardTask } from '../components/cardTask/interface/cardTaskProps';
import { TaskById } from '../models/task.type';

export interface ColumnRequest {
  title: string;
  order: string;
}

export interface Column extends ColumnRequest {
  id: string;
}

export interface ColumnById extends Column {
  tasks: CardTask[];
}
