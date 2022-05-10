import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Lang } from './types/lang';
import { Switch } from '@mui/material';
import './style.scss';

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, toggleLang] = useState<string>(Lang.en);

  const changeLang = () => {
    const currentLang = lang === Lang.en ? Lang.ru : Lang.en;
    toggleLang(currentLang);
    i18n.changeLanguage(currentLang);
  };

  return (
    <div className="switcher-wrapper">
      <span className="lang-label">{Lang.ru}</span>
      <Switch defaultChecked onChange={changeLang} />
      <span className="lang-label">{Lang.en}</span>
    </div>
  );
};
