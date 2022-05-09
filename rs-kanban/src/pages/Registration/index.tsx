import './style.scss';
import { useTranslation } from 'react-i18next';

export const Registration = () => {
  const { t } = useTranslation();
  return <div className="registration">{t('pages.registration')}</div>;
};
