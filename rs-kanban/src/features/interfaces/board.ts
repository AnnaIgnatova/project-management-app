import { Column } from './../../models/column.type';

export interface NewBoardPayload {
  title: string;
}

export interface Board {
  id: string;
  title: string;
}

export interface BoardsState {
  boardId: string;
  boards: Board[];
  columns: Column[];
}
