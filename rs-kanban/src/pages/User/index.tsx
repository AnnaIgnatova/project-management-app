import './style.scss';
import { useTranslation } from 'react-i18next';

export const User = () => {
  const { t } = useTranslation();
  return <div className="user">{t('pages.user')}</div>;
};
