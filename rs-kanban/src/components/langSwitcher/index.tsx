import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AntSwitch } from './AntSwitch';

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  const changeLang = () => {
    const currentLang = lang === 'en' ? 'ru' : 'en';
    setLang(currentLang);
    i18n.changeLanguage(currentLang);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>ru</Typography>
      <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onClick={changeLang} />
      <Typography>en</Typography>
    </Stack>
  );
};
