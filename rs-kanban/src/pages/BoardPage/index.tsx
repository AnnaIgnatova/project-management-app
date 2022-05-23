import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../store';
import { Column } from '../../components/column';
import { Box, Button, Container, Typography, Modal, TextField } from '@mui/material';
import { useEffect, useState, ChangeEvent } from 'react';
import { getBoardById } from '../../api/boards';
import { BoardById } from '../../models/board.type';
import { getColsData, createColumnReducer } from '../../features/boards/boardsSlice';
import './style.scss';
import { createColumn } from '../../api/columns/create-column.api';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../models/routes';

export const BoardPage: React.FC = () => {
  const { t } = useTranslation();

  const { boardId, columns } = useAppSelector((state) => state.boardsReducer);
  const [boardByIdInfo, setBoardByIdInfo] = useState<BoardById>({
    id: '',
    title: '',
    description: '',
    columns: [],
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    getBoardById(boardId).then(setBoardByIdInfo);
    dispatch(getColsData(boardId));
  }, []);

  const { title } = boardByIdInfo;

  const [columnTitle, setColumnTitle] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const changeColumnTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value);
  };
  const handleCreateColumn = () => {
    createColumn(boardId, { title: columnTitle }).then((response) =>
      dispatch(createColumnReducer(response))
    );
    handleClose();
  };

  return (
    <>
      <Container maxWidth="xl" className="boardPage">
        <Typography variant="h4" component="h1" align="center" sx={{ height: '40px' }}>
          {title}
        </Typography>
        <Box
          sx={{
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '50px',
          }}
        >
          <Button variant="contained" sx={{ height: '30px' }} onClick={handleOpen}>
            {t('pages.boardPage.columnBtn')}
          </Button>
          <NavLink to={Routes.main}>
            <Button variant="outlined" sx={{ height: '30px' }}>
              {t('header.btnMain')}
            </Button>
          </NavLink>
        </Box>
        <Box sx={{ display: 'flex', flex: '1', overflowX: 'auto', height: 'calc(100vh - 262px)' }}>
          <Box
            sx={{
              display: 'flex',
              columnGap: '20px',
            }}
          >
            {columns.map((column) => (
              <Column key={column.id} value={column} />
            ))}
          </Box>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-cnc">
          <h2 className="modal-cnc__text">{t('pages.boardPage.createNewColumn')}</h2>
          <div className="modal-cnc__input">
            <TextField
              label={t('pages.boardPage.newColumn')}
              placeholder={t('pages.boardPage.newColumnTitle')}
              variant="standard"
              fullWidth
              onChange={changeColumnTitle}
            />
          </div>

          <Button id="modal-cnc__btn" variant="outlined" onClick={handleCreateColumn}>
            {t('buttons.create')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
