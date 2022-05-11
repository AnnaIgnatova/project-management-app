import { Board } from '../../components/board';
import { Navigate } from 'react-router-dom';
import './style.scss';
import { welcomeBoards, welcomeTitle } from './constants/welcomeData';

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
          {welcomeBoards.map((board) => (
            <Board data={board} key={board.title} />
          ))}
        </div>
      </div>
    );
  return <Navigate to="/main" />;
};
