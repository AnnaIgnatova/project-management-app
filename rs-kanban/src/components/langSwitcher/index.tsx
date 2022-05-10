import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AntSwitch } from './AntSwitch';
import { Lang } from './types/lang';
import { Switch } from '@mui/material';

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, toggleLang] = useState<string>(Lang.en);

  const changeLang = () => {
    const currentLang = lang === Lang.en ? Lang.ru : Lang.en;
    toggleLang(currentLang);
    i18n.changeLanguage(currentLang);
  };

  return (
    <Switch defaultChecked />
    // <Stack direction="row" spacing={1} alignItems="center">
    //   <Typography>ru</Typography>
    //   <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onClick={changeLang} />
    //   <Typography>en</Typography>
    // </Stack>
  );
};
