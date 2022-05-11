import { Modal, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../models/routes';
import './style.scss';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="container-header">
      <button className="cnb-btn" onClick={handleOpen}>
        Create new board
      </button>
      <Link className="login-btn" to={Routes.login}>
        Login
      </Link>
      <Link className="singup-btn" to={Routes.registration}>
        Sign up
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-cnb">
          <h2 className="modal-cnb__text">Create new board</h2>
          <div className="modal-cnb__input">
            <TextField
              id="standard-basic"
              label="New board"
              placeholder="Enter title new board"
              variant="standard"
            />
          </div>
          <Button id="modal-cnb__btn" variant="outlined">
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
