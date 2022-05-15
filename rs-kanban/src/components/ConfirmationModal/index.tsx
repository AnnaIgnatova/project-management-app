import { Modal, Box, TextField, Button, ButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { ConfirmationModalProps } from './interface/ConfirmationModal.type';
import './style.scss';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  setOpenModal,
  deleteFn,
  thingToBeRemoved,
}) => {
  const [deleteMsgText, setDeleteMsgText] = useState<string>('');

  const handleClose = () => setOpenModal(false);

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
          <TextField
            placeholder="delete"
            label="Enter delete"
            required
            onChange={(e) => setDeleteMsgText(e.target.value)}
          />
          <ButtonGroup className="confirmation-modal__btns">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={deleteMsgText !== 'delete'}
              onClick={deleteFn}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </Modal>
  );
};
