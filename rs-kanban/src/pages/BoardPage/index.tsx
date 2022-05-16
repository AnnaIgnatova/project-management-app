import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getColsData } from '../../features/boards/boardsSlice';
import { useAppSelector, useAppDispatch } from '../../store';
import { Column, ColumnProps } from '../../components/column';
import './style.scss';

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  const columns = useAppSelector((state) => state.boardsReducer.columns);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getColsData(boardId));
  }, []);

  return (
    <div className="board-page">
      <h2 className="main-title">Board Page</h2>
      <hr />
      <div className="board-page-columns">
        {columns.map((col: ColumnProps) => (
          <Column key={col.id} id={col.id} title={col.title} order={col.order} />
        ))}
      </div>
    </div>
  );
};

