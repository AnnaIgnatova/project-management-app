import { useAppSelector } from '../../store';
import './style.scss';

export const BoardPage = () => {
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  return <div className="board">board</div>;
};
