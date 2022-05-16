import './style.scss';
import { useTranslation } from 'react-i18next';
import { BoardCard } from './../../components/boardCard';
import { useAppDispatch } from './../../store';

const boardId = '440e71f7-1012-42fc-8867-cd4cd45f7ab8';

export const Main: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <div className="main">
      <BoardCard id={boardId} title="1" colNum={2} tasksNum={2} />
    </div>
  );
};
