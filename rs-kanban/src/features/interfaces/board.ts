import { Board } from './../../models';
import { Column } from './../../models';

export interface NewBoardPayload {
  title: string;
}

export interface BoardsState {
  boardId: string;
  boards: Board[];
  columns: Column[];
}
