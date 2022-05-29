import './style.scss';
import { useTranslation } from 'react-i18next';
import { BackLink } from '../../components/backLink';
import { Container } from '@mui/material';

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="xl" className="boardPage">
      <BackLink />
      {t('pages.notFound')}
    </Container>
  );
};
