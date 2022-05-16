import { useEffect } from 'react';
import { getColsData } from '../../features/boards/boardsSlice';
import { useAppSelector, useAppDispatch } from '../../store';
import './style.scss';

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  const columns = useAppSelector((state) => state.boardsReducer.columns);

  useEffect(() => {
    dispatch(getColsData(boardId));
  }, []);

  return <div className="board">boarddvdfrfgvrfg</div>;
};
