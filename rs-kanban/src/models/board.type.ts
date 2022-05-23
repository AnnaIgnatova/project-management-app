import { ColumnById } from '../models';

export interface BoardRequest {
  title: string;
  description: string;
}

export interface Board extends BoardRequest {
  id: string;
}

export interface BoardById extends Board {
  columns: ColumnById[];
}
