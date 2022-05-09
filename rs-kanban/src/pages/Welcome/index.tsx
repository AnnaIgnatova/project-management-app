import './style.scss';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../../components/langSwitcher';

export const Welcome = () => {
  const { t } = useTranslation();
  return (
    <div className="welcome">
      {t('pages.welcome')} <LangSwitcher />
    </div>
  );
};
