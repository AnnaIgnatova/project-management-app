import './style.scss';
import { Link, NavLink } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { GetValueToken } from '../../utils/getValueToken';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../langSwitcher';
import { ChangeEvent, useEffect, useState } from 'react';
import { createNewBoard } from '../../features/boards/boardsSlice';

export const StickyHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState<string>('');
  const [boardDescription, setBoardDescription] = useState<string>('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setBoardName('');
    setBoardDescription('');
  };

  const createBoard = () => {
    dispatch(createNewBoard({ title: boardName, description: boardDescription }));
    handleClose();
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardDescription(e.target.value);
  };

  const { t } = useTranslation();
  const { isToken, token } = useAppSelector((state) => state.tokenReduser);
  GetValueToken();

  const signOut = () => {
    document.cookie = `Token=${token}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    location.reload();
  };

  useEffect(() => {
    getBtnHeader();
  }, []);

  const isCreateBtnDisabled = boardName === '' || boardDescription === '';

  const getBtnHeader = () => {
    if (isToken) {
      if (location.pathname === '/') {
        return (
          <NavLink to={Routes.main}>
            <Button className="main-btn" variant="contained">
              {t('header.btnMain')}
            </Button>
          </NavLink>
        );
      }

      return (
        <>
          <LangSwitcher />
          <Button variant="contained" onClick={handleOpen}>
            {t('header.btnNewBoard')}
          </Button>

          <Link to={Routes.editProfile}>
            <Button variant="contained">{t('header.btnEditProfile')}</Button>
          </Link>
          <Button variant="contained" color="error" onClick={signOut}>
            {t('header.btnSignOut')}
          </Button>
        </>
      );
    }

    return (
      <>
        <Link to={Routes.login}>
          <Button className="login-btn" variant="contained">
            {t('header.btnLogin')}
          </Button>
        </Link>
        <Link to={Routes.registration}>
          <Button className="singup-btn" variant="contained">
            {t('header.btnSignUp')}
          </Button>
        </Link>
      </>
    );
  };

  return (
    <>
      <div className="container-header">
        <div className="sticky-header">
          <div className="container-btn">{getBtnHeader()}</div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-cnb">
          <h2 className="modal-cnb__text">{t('modalNewBoard.title')}</h2>
          <div className="modal-cnb__input">
            <TextField
              id="standard-basic"
              label={t('modalNewBoard.label')}
              placeholder={t('modalNewBoard.placeholder')}
              variant="standard"
              error={boardName === ''}
              onChange={handleChangeName}
            />
            <TextField
              label={t('modalNewBoard.descrLabel')}
              placeholder={t('modalNewBoard.descrPlaceholder')}
              variant="standard"
              margin="normal"
              error={boardDescription === ''}
              onChange={handleChangeDescription}
            />
          </div>
          <Button
            id="modal-cnb__btn"
            variant="outlined"
            disabled={isCreateBtnDisabled}
            onClick={createBoard}
          >
            {t('modalNewBoard.btn')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
