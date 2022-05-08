import { Task } from '../task';
import { BoardProps } from './interfaces/boardProps';
import './style.scss';

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const { title, tasks } = props.data;
  return (
    <div className="board">
      <div className="board-title-wrapper">
        <span className="board-title-marker"></span>
        <div className="board-title">{title}</div>
        <div className="board-tasks-count">{tasks.length}</div>
      </div>
      <div className="tasks">
        {tasks.map((task) => (
          <Task key={task.title} taskData={task} />
        ))}
      </div>
    </div>
  );
};
