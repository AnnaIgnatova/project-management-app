import './style.scss';
import { useTranslation } from 'react-i18next';

export const Main = () => {
  const { t } = useTranslation();
  return <div className="main">main</div>;
};
