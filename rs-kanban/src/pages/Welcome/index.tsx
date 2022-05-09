import './style.scss';
import { useTranslation } from 'react-i18next';

export const Welcome = () => {
  const { t } = useTranslation();
  return <div className="welcome">{t('pages.welcome')}</div>;
};
