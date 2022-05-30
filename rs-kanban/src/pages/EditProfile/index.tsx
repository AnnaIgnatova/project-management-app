import './style.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, IconButton, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { updateUserAPI, deleteUserAPI } from '../../api/users';
import { SignUp } from '../../models/signup.type';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateUser, deleteUser } from '../../features/user/userSlice';
import { Routes } from '../../models/routes';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { useTranslation } from 'react-i18next';
import { BackLink } from '../../components/backLink';

export const EditProfile: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { id, name, login } = useAppSelector((state) => state.userReducer.user);
  const navigate = useNavigate();

  const [isOpenDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isDisabledInputs, setDisabledInputs] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<SignUp>({ name: name, login: login, password: '' });

  const [validName, setValidName] = useState<boolean>(false);
  const [validLogin, setValidLogin] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [validButton, setValidButton] = useState<boolean>(true);

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
    updateUserAPI(id, userInfo).then(() =>
      dispatch(updateUser({ name: userInfo.name, login: userInfo.login }))
    );
    setUserInfo({ ...userInfo, password: '' });
    setValidPassword(true);
  };

  const goBackFromEdit = () => {
    setUserInfo({ name: name, login: login, password: '' });
    setDisabledInputs(true);
    setValidPassword(true);
  };

  const changeBtnFn = () => {
    setDisabledInputs(!isDisabledInputs);
    !isDisabledInputs && updateHandler();
  };

  const deleteUserFn = () => {
    deleteUserAPI(id);
    dispatch(deleteUser());
    navigate(Routes.welcome);
  };

  const handleOpen = () => setOpenDeleteModal(true);

  const handleSubmit = (e: React.SyntheticEvent) => e.preventDefault();

  return (
    <Container maxWidth="xl" className="boardPage">
      <BackLink />
      <div className="edit-profile-container">
        <Box component="form" className="edit-profile-form" onSubmit={handleSubmit} width={'30%'}>
          <Typography variant="h5" component="p">
            {!isDisabledInputs && (
              <IconButton sx={{ mr: '20px' }} color="inherit" onClick={goBackFromEdit}>
                <ArrowBackIcon />
              </IconButton>
            )}
            {t('pages.user.userProfile')}
          </Typography>
          <TextField
            sx={{ width: '80%' }}
            required
            disabled={isDisabledInputs}
            name="name"
            label={
              isDisabledInputs
                ? t('pages.user.nameLabelIsDisable')
                : t('pages.user.nameLabelNoDisable')
            }
            error={!isDisabledInputs && validName}
            defaultValue={name}
            onChange={changeHandler}
            helperText={!isDisabledInputs && t('pages.user.nameHelperText')}
          />
          <TextField
            sx={{ width: '80%' }}
            required
            disabled={isDisabledInputs}
            name="login"
            label={
              isDisabledInputs
                ? t('pages.user.loginLabelIsDisable')
                : t('pages.user.loginLabelNoDisable')
            }
            error={!isDisabledInputs && validLogin}
            defaultValue={login}
            onChange={changeHandler}
            helperText={!isDisabledInputs && t('pages.user.loginHelperText')}
          />
          {!isDisabledInputs && (
            <TextField
              sx={{ width: '80%' }}
              required
              name="password"
              label={t('pages.user.passwordLabel')}
              type="password"
              error={validPassword}
              value={userInfo.password}
              onChange={changeHandler}
              helperText={t('pages.user.passwordHelperText')}
            />
          )}
          <Button
            variant="contained"
            disabled={!isDisabledInputs && validButton}
            onClick={changeBtnFn}
            sx={{ width: '50%' }}
          >
            {isDisabledInputs
              ? `
            ${t('buttons.change')}`
              : `${t('buttons.saveChanges')}`}
          </Button>
          <Button variant="contained" color="error" onClick={handleOpen} sx={{ width: '50%' }}>
            {t('pages.user.deleteBtn')}
          </Button>
        </Box>
      </div>
      <ConfirmationModal
        open={isOpenDeleteModal}
        setOpenModal={setOpenDeleteModal}
        deleteFn={deleteUserFn}
        thingToBeRemoved="account"
      />
    </Container>
  );
};
