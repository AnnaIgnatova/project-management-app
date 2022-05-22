import { Board } from '../../../features/interfaces/board';

export interface BoardCardProps {
  boardData: Board;
  setOpenModal: (value: boolean) => void;
  setBoardId: (value: string) => void;
}
