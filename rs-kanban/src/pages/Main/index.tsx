import './style.scss';
import { useTranslation } from 'react-i18next';
import { BoardCard } from './../../components/boardCard';
import { useAppDispatch, useAppSelector } from './../../store';
import { useEffect, useState } from 'react';
import { deleteBoardCard, getBoardsData } from '../../features/boards/boardsSlice';
import { Board } from '../../models';
import { ConfirmationModal } from './../../components/ConfirmationModal';

export const Main: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const boards: Board[] = useAppSelector((state) => state.boardsReducer.boards);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<string>('');

  useEffect(() => {
    dispatch(getBoardsData());
  }, []);

  const deleteBoardById = () => {
    dispatch(deleteBoardCard(boardId));
    setModalOpen(false);
  };

  return (
    <>
      <ConfirmationModal
        open={isModalOpen}
        thingToBeRemoved="board"
        setOpenModal={setModalOpen}
        deleteFn={deleteBoardById}
      />
      <div className="main">
        <h2 className="main-title">{t('pages.main.title')}</h2>
        <hr />
        <div className="main-boards">
          {boards.map((board) => (
            <BoardCard
              boardData={board}
              key={board.id}
              setOpenModal={setModalOpen}
              setBoardId={setBoardId}
            />
          ))}
        </div>
      </div>
    </>
  );
};
