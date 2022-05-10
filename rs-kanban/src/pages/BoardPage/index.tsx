import './style.scss';
import { useTranslation } from 'react-i18next';

export const BoardPage = () => {
  const { t } = useTranslation();
  return <div className="board">{t('pages.board')}</div>;
};
