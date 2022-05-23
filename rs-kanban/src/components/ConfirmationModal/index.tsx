import { Modal, Box, TextField, Button, ButtonGroup, Typography } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { ConfirmationModalProps } from './interface/ConfirmationModal.type';
import { useTranslation } from 'react-i18next';
import './style.scss';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  setOpenModal,
  deleteFn,
  thingToBeRemoved,
}) => {
  const { t } = useTranslation();

  const [deleteMsgText, setDeleteMsgText] = useState<string>('');

  const handleClose = () => setOpenModal(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setDeleteMsgText(e.target.value);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="confirmation-modal">
        <Typography sx={{ fontWeight: 'bold' }}>
          {`Are you sure you want to delete ${thingToBeRemoved}?`}
        </Typography>
        <Box component="form" onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
          <Typography sx={{ mb: '20px', mt: '10px', fontWeight: 'normal' }}>
            Enter the word
            <Typography sx={{ fontWeight: 'bold' }} component="span">
              {' delete '}
            </Typography>
            in the input
          </Typography>
          <TextField placeholder="delete" label="Enter delete" required onChange={handleChange} />
          <ButtonGroup className="confirmation-modal__btns">
            <Button variant="contained" onClick={handleClose}>
              {t('buttons.cancel')}
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={deleteMsgText !== 'delete'}
              onClick={deleteFn}
            >
              {t('buttons.delete')}
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </Modal>
  );
};
