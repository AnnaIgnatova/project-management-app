import './style.scss';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const { t } = useTranslation();
  return <div className="login">{t('pages.login')}</div>;
};
