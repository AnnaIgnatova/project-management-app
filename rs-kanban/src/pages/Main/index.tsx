import './style.scss';
import { useTranslation } from 'react-i18next';
import { BoardCard } from './../../components/boardCard';
import { useAppDispatch, useAppSelector } from './../../store';
import { useEffect } from 'react';
import { getBoardsData } from '../../features/boards/boardsSlice';
import { Board } from '../../models';

export const Main: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const boards: Board[] = useAppSelector((state) => state.boardsReducer.boards);

  useEffect(() => {
    dispatch(getBoardsData());
  }, []);

  return (
    <div className="main">
      <h2 className="main-title">{t('pages.main.title')}</h2>
      <hr />
      <div className="main-boards">
        {boards.map((board) => (
          <BoardCard boardData={board} key={board.title} />
        ))}
      </div>
    </div>
  );
};
