import { Box, TextField, Button, ButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../../models/routes';
import { deleteUserAPI } from '../../../api/users';
import { DeleteWindowProps } from './interface/DeleteWindow';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { deleteUser } from '../../../features/user/userSlice';

export const DeleteWindow: React.FC<DeleteWindowProps> = ({ setOpenDeleteModal }) => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.userReducer.user);

  const navigate = useNavigate();
  const [deleteMsgText, setDeleteMsgText] = useState<string>('');

  const deleteUserFn = () => {
    deleteUserAPI(id);
    dispatch(deleteUser());
    navigate(Routes.welcome);
  };

  return (
    <div className="delete-user-modal-window">
      <Typography sx={{ fontWeight: 'bold' }}>
        Are you sure you want to delete your account?
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
        <ButtonGroup className="cancel-delete-btns">
          <Button variant="contained" onClick={() => setOpenDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={deleteMsgText !== 'delete'}
            onClick={deleteUserFn}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};
