import { Modal, Box, TextField, Button } from '@mui/material';
import { createNewBoard } from './../../features/boards/boardsSlice';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { useAppDispatch } from './../../store';
import './style.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState<string>('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createBoard = () => {
    dispatch(createNewBoard({ title: boardName }));
    handleClose();
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setBoardName(name);
  };

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
              onChange={handleChangeName}
            />
          </div>
          <Button id="modal-cnb__btn" variant="outlined" onClick={createBoard}>
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
