import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../store';
import { Column } from '../../components/column';
import { Box, Button, Container, Typography, Modal, TextField } from '@mui/material';
import { useEffect, useState, ChangeEvent, useRef } from 'react';
import { getBoardById } from '../../api/boards';
import { Board } from '../../models/board.type';
import './style.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { createBoardColumn, getBoard, getTasks } from './../../features/board/boardSlice';

export const BoardPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { boardId } = useAppSelector((state) => state.boardsReducer);
  const board = useAppSelector((state) => state.boardReducer.board);
  const [boardByIdInfo, setBoardByIdInfo] = useState<Board>({
    id: '',
    title: '',
    description: '',
    order: 1,
  });
  const [columnTitle, setColumnTitle] = useState<string>('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getBoardById(boardId).then((data) => {
      setBoardByIdInfo(data);
      dispatch(getBoard(data));
      dispatch(getTasks());
    });
  }, [boardId, dispatch]);

  const { title } = boardByIdInfo;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const changeColumnTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value);
  };
  const handleCreateColumn = () => {
    dispatch(createBoardColumn({ boardId, title: columnTitle }));
    handleClose();
  };

  const sortColumns = [...board.columns].sort(
    (column1, column2) => +column1.order - +column2.order
  );

  if (!boardId) {
    navigate('/main');
  }

  return (
    <>
      <Container maxWidth="xl" className="boardPage">
        <Typography variant="h4" component="h1" align="center" id="board-title">
          {title}
        </Typography>
        <Box className="board-header-buttons">
          <Button variant="contained" sx={{ height: '30px' }} onClick={handleOpen}>
            {t('pages.boardPage.columnBtn')}
          </Button>
          <NavLink to={Routes.main}>
            <Button variant="outlined" sx={{ height: '30px' }}>
              {t('header.btnMain')}
            </Button>
          </NavLink>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            overflowX: 'auto',
            overflowY: 'hidden',
            height: 'calc(100vh - 262px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              columnGap: '20px',
            }}
          >
            {sortColumns.map((column) => (
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

          <Button
            id="modal-cnc__btn"
            variant="contained"
            disabled={columnTitle === ''}
            onClick={handleCreateColumn}
          >
            {t('buttons.create')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
