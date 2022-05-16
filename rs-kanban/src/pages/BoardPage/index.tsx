import { useTranslation } from 'react-i18next';
import { Column } from '../../components/column';
import './style.scss';

export const BoardPage = () => {
  const { t } = useTranslation();
  return (
    <div className="board-page">
      <h2 className="main-title">Board Page</h2>
      <hr />
      <div className="board-page-columns"></div>
    </div>
  );
};
