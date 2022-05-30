import { Board } from '../../components/board';
import { Navigate } from 'react-router-dom';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { welcomeBoards, welcomeTitle } from './constants/welcomeData';

export const Welcome: React.FC = () => {
  const isActiveToken = false;
  const { t } = useTranslation();
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
          {welcomeBoards.map((board, index) => (
            <Board
              data={{ ...board, title: t(`pages.welcome.title_${index + 1}`), i: index + 1 }}
              key={t(`pages.welcome.title_${index + 1}`)}
            />
          ))}
        </div>
      </div>
    );

  return <Navigate to="/main" />;
};
