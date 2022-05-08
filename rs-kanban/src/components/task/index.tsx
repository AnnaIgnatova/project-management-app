import { TaskProps } from './interfaces/taskProps';
import './style.scss';

export const Task: React.FC<TaskProps> = (props: TaskProps) => {
  const { title, description, img } = props.taskData;
  return (
    <div className="task">
      <div className="task-priority">Completed</div>
      <span className="task-title">{title}</span>
      {img && <img src={img} alt="task img" className="task-img" />}
      <span className="task-description">{description}</span>
      {img && (
        <div className="task-files-wrapper">
          <div className="task-files-icon"></div>
          <div className="task-files-count">
            <span className="task-files-count">1</span> files
          </div>
        </div>
      )}
    </div>
  );
};
