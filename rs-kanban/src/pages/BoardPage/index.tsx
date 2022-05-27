import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../store';
import { Column } from '../../components/column';
import { Box, Button, Container, Typography, Modal, TextField } from '@mui/material';
import { useEffect, useState, ChangeEvent, useRef } from 'react';
import { getBoardById } from '../../api/boards';
import { Board, BoardById } from '../../models/board.type';
import './style.scss';
import { NavLink } from 'react-router-dom';
import { Routes } from '../../models/routes';
import { createBoardColumn, getBoard, getTasks } from './../../features/board/boardSlice';
import { useDrag, useDrop } from 'react-dnd';
import { CardTask } from '../../components/cardTask/interface/cardTaskProps';
import { iteratorSymbol } from 'immer/dist/internal';

interface ColumnsType {
  order: number;
  id: string;
  title: string;
  tasks: CardTask[];
}

export const BoardPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { boardId } = useAppSelector((state) => state.boardsReducer);
  const board = useAppSelector((state) => state.boardReducer.board);
  const columns: ColumnsType[] = useAppSelector((state) => state.boardReducer.board.columns);
  const [boardByIdInfo, setBoardByIdInfo] = useState<Board>({
    id: '',
    title: '',
    description: '',
    order: 1,
  });
  const [columnTitle, setColumnTitle] = useState<string>('');
  const [open, setOpen] = useState(false);

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

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: columns.map(({ id }) => id),
    drop: (item: ColumnsType) => ({ item }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;

  // const handleDropColumn = (item: ColumnsType) => {
  //   console.log(item);
  //   const column = columns.filter(({ id }) => id === item.id)[0];
  //   const columnId = column.id;
  //   console.log(columnId);
  // };

  const sortColumns = [...board.columns].sort(
    (column1, column2) => +column1.order - +column2.order
  );

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
            ref={drop}
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

          <Button id="modal-cnc__btn" variant="outlined" onClick={handleCreateColumn}>
            {t('buttons.create')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};
