import './style.scss';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useAppDispatch } from '../../store';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useState } from 'react';
import { createNewBoard } from '../../features/boards/boardsSlice';
import { BtnHeader } from './BtnHeader';

export const StickyHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState<string>('');
  const [boardDescription, setBoardDescription] = useState<string>('');
  const handleOpen = () => {
    setOpen(true);
    burgerClose();
  };
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

  const isCreateBtnDisabled = boardName === '' || boardDescription === '';

  const [isBurgerMenu, setBurgerMenu] = useState(false);
  const burgerToggle = () => setBurgerMenu(!isBurgerMenu);

  const burgerClose = () => setBurgerMenu(false);

  return (
    <>
      <div className={`burger ${isBurgerMenu && 'active'}`} onClick={burgerToggle}>
        <span></span>
      </div>
      <div className="container-header">
        <div className="sticky-header">
          <div className="container-btn main-container">
            <div className={`main-buttons ${isBurgerMenu && 'active'}`}>
              <BtnHeader open={handleOpen} />
            </div>
          </div>
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
              onChange={handleChangeName}
            />
            <TextField
              label={t('modalNewBoard.descrLabel')}
              placeholder={t('modalNewBoard.descrPlaceholder')}
              variant="standard"
              margin="normal"
              onChange={handleChangeDescription}
            />
          </div>
          <Button
            id="modal-cnb__btn"
            variant="contained"
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
