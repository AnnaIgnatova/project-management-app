import { useTranslation } from 'react-i18next';
import { Task } from '../task';
import { WelcomePageTask } from '../task/interfaces/taskProps';
import './style.scss';

export interface BoardData {
  i: number;
  title: string;
  tasks: WelcomePageTask[];
}
export interface BoardProps {
  data: BoardData;
}

export const Board: React.FC<BoardProps> = (props) => {
  const { title, tasks, i } = props.data;
  const { t } = useTranslation();
  return (
    <div className="board">
      <div className="board-title-wrapper">
        <span className="board-title-marker"></span>
        <div className="board-title">{title}</div>
        <div className="board-tasks-count">{tasks.length}</div>
      </div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            key={t(`pages.welcome.task_${i}.title_${index + 1}`)}
            taskData={{ ...task, title: t(`pages.welcome.task_${i}.title_${index + 1}`) }}
          />
        ))}
      </div>
    </div>
  );
};
