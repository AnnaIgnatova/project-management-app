import './style.scss';
import { useState } from 'react';
import { Modal, Box, TextField, Button, ButtonGroup } from '@mui/material';

export const EditProfile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="edit-profile-container">
        <Box
          component="form"
          className="edit-profile-form"
          onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}
        >
          <TextField placeholder="Enter your name" required />
          <TextField placeholder="Enter your login" required />
          <TextField type="password" placeholder="Enter your password" required />
          <Button variant="contained">Save Changes</Button>
        </Box>
        <Button
          variant="contained"
          color="error"
          style={{ width: '200px', marginBottom: '40px' }}
          onClick={() => setOpen(true)}
        >
          Delete account
        </Button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="delete-user-modal-window">
          <p>Are you sure you want to delete your account?</p>
          <Box component="form" onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
            <div className="delete-condition">
              Enter the word <b>delete</b> in the input
            </div>
            <TextField placeholder="delete" />
            <ButtonGroup className="cancel-delete-btns">
              <Button variant="contained" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        </div>
      </Modal>
    </>
  );
};
