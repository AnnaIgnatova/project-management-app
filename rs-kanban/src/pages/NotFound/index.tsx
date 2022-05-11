import './style.scss';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();
  return <div className="not-found">{t('pages.notFound')}</div>;
};
