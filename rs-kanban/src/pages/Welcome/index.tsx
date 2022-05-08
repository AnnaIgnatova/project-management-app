import { Board } from '../../components/board';
import { Navigate } from 'react-router-dom';
import './style.scss';
import {
  welcomeBoardCourseData,
  welcomeBoardProjectData,
  welcomeTitle,
} from './constants/welcomeData';

export const Welcome: React.FC = () => {
  const isActiveToken = false;
  if (!isActiveToken)
    return (
      <div className="welcome">
        <div className="welcome-arrow"></div>
        <div className="welcome-title-wrapper">
          {welcomeTitle.map((title) => (
            <span className="welcome-title" key={title}>
              {title}
            </span>
          ))}
        </div>
        <div className="welcome-info">
          <Board data={welcomeBoardCourseData} />
          <Board data={welcomeBoardProjectData} />
        </div>
      </div>
    );
  return <Navigate to="/main" />;
};
