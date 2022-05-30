import './style.scss';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl" className="boardPage">
      <h2 className="not-found-title">{t('pages.notFound')}</h2>
      <img src="./assets/gif/404.gif" alt="404" className="not-found-img" />
    </Container>
  );
};
