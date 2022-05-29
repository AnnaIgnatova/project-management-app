import { useTranslation } from 'react-i18next';
import { TaskProps } from './interfaces/taskProps';
import './style.scss';

export const Task: React.FC<TaskProps> = (props) => {
  const { title, description, img } = props.taskData;
  const { t } = useTranslation();
  return (
    <div className="task">
      <div className="task-priority">{t('pages.welcome.completed')}</div>
      <span className="task-title">{title}</span>
      {img && <img src={img} alt="task img" className="task-img" />}
      <span className="task-description">{description}</span>
      {img && (
        <div className="task-files-wrapper">
          <img src="./assets/images/file-icon.png" alt="file icon" />
          <div className="task-files-icon"></div>
          <div className="task-files-count">
            <span className="task-files-count">1</span> {t('pages.welcome.file')}
          </div>
        </div>
      )}
    </div>
  );
};
