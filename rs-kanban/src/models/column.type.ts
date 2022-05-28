import { CardTask } from '../components/cardTask/interface/cardTaskProps';

export interface ColumnRequest {
  title: string;
}

export interface ColumnUpdate extends ColumnRequest {
  order: number;
}

export interface Column extends ColumnUpdate {
  id: string;
}

export interface ColumnById extends Column {
  tasks: CardTask[];
}
