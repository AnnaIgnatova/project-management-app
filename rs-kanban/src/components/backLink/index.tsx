import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material';
import './style.scss';
import { useTranslation } from 'react-i18next';

export const BackLink: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Button variant="outlined" className="back-link" onClick={() => navigate(-1)}>
      <KeyboardBackspaceIcon className="back-icon" />
      {t('pages.back')}
    </Button>
  );
};
