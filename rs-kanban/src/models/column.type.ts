import { CardTask } from '../components/cardTask/interface/cardTaskProps';

export interface ColumnRequest {
  title: string;
  order: number;
}

export interface Column extends ColumnRequest {
  id: string;
}

export interface ColumnById extends Column {
  tasks: CardTask[];
}
