import './style.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, TextField, Button, ButtonGroup, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getUserById, updateUser, deleteUser } from '../../api/users';
import { SignUp } from '../../models/signup.type';
import { Routes } from '../../models/routes';

const userID = '7a11f633-1800-4d65-a218-b1b1099128ef';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isDisabledInputs, setDisabledInputs] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<SignUp>({ name: '', login: '', password: '' });
  const [deleteMessage, setDeleteMessage] = useState<string>('');

  const [validName, setValidName] = useState<boolean>(false);
  const [validLogin, setValidLogin] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [validButton, setValidButton] = useState<boolean>(true);

  useEffect(() => {
    getUserById(userID).then(({ name, login }) =>
      setUserInfo({ name: name, login: login, password: '' })
    );
  }, []);

  useEffect(() => {
    const isValid = !validName && !validLogin && !validPassword;
    setValidButton(!isValid);
  }, [validName, validLogin, validPassword]);

  const setName = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const isValidName = value.length < 2;
    setValidName(isValidName);
  };

  const setLogin = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const isValidLogin = value.length < 3;
    setValidLogin(isValidLogin);
  };

  const setPassword = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const isValidPassword = value.length <= 6;
    setValidPassword(isValidPassword);
  };

  const changeHandler = (event: React.ChangeEvent) => {
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    setUserInfo({ ...userInfo, [name]: value });
    switch (name) {
      case 'name':
        setName(event);
        break;
      case 'login':
        setLogin(event);
        break;
      case 'password':
        setPassword(event);
        break;
      default:
        break;
    }
  };

  const updateHandler = () => {
    updateUser(userID, userInfo);
    setUserInfo({ ...userInfo, password: '' });
    setValidPassword(true);
  };

  return (
    <>
      <div className="edit-profile-container">
        <Box
          component="form"
          className="edit-profile-form"
          onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}
        >
          <Typography variant="h5" component="p">
            {!isDisabledInputs && (
              <IconButton
                sx={{ mr: '20px' }}
                color="inherit"
                onClick={() => {
                  setDisabledInputs(true);
                  getUserById(userID).then(({ name, login }) =>
                    setUserInfo({ name: name, login: login, password: '' })
                  );
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            User profile
          </Typography>
          <TextField
            required
            disabled={isDisabledInputs}
            name="name"
            label={isDisabledInputs ? 'Your name' : 'Change your name'}
            error={!isDisabledInputs && validName}
            value={userInfo.name}
            onChange={changeHandler}
            helperText={!isDisabledInputs && 'Enter min 2 symbols'}
          />
          <TextField
            required
            disabled={isDisabledInputs}
            name="login"
            label={isDisabledInputs ? 'Your login' : 'Change your login'}
            error={!isDisabledInputs && validLogin}
            value={userInfo.login}
            onChange={changeHandler}
            helperText={!isDisabledInputs && 'Enter min 3 symbols'}
          />
          {!isDisabledInputs && (
            <TextField
              required
              name="password"
              label={'Change your password'}
              type="password"
              error={validPassword}
              value={userInfo.password}
              onChange={changeHandler}
              helperText="Enter more than 6 characters"
            />
          )}
          <Button
            variant="contained"
            disabled={!isDisabledInputs && validButton}
            sx={{ width: '175px' }}
            onClick={() => {
              setDisabledInputs(!isDisabledInputs);
              !isDisabledInputs && updateHandler();
            }}
          >
            {isDisabledInputs ? 'Change' : 'Save Changes'}
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ width: '125px', fontSize: '0.5rem' }}
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete account
          </Button>
        </Box>
      </div>
      <Modal
        open={isOpenDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="delete-user-modal-window">
          <Typography sx={{ fontWeight: 'bold' }}>
            Are you sure you want to delete your account?
          </Typography>
          <Box component="form" onSubmit={(e: React.SyntheticEvent) => e.preventDefault()}>
            <Typography sx={{ mb: '20px', mt: '10px', fontWeight: 'normal' }}>
              Enter the word{' '}
              <Typography sx={{ fontWeight: 'bold' }} component="span">
                delete
              </Typography>{' '}
              in the input
            </Typography>
            <TextField
              placeholder="delete"
              label="Enter delete"
              required
              onChange={(e) => setDeleteMessage(e.target.value)}
            />
            <ButtonGroup className="cancel-delete-btns">
              <Button variant="contained" onClick={() => setOpenDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={deleteMessage !== 'delete'}
                onClick={() => {
                  deleteUser(userID);
                  navigate(Routes.welcome);
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        </div>
      </Modal>
    </>
  );
};
