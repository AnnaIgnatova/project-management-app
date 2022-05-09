import { TasksInColumn } from '../models';

export interface ColumnRequest {
  title: string;
  order: number;
}

export interface Column extends ColumnRequest {
  id: string;
}

export interface ColumnById extends Column {
  tasks: TasksInColumn[];
}
