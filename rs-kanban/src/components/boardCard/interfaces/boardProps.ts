import { Board } from './../../../models/board.type';

export interface BoardCardProps {
  boardData: Board;
  setOpenModal: (value: boolean) => void;
  setBoardId: (value: string) => void;
}
