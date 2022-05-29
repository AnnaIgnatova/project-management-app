import { Box, Button, Card, CardContent, Modal, TextField, Typography, Stack } from '@mui/material';
import { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './../../store';
import { CardTask as Task } from '../../components/cardTask';
import { ColumnDropType, ColumnProps, DropItem } from './interface/columnProps';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { TaskRequest } from '../../models/task.type';
import { FormEvent } from './interface/FormEvent';
import { ConfirmationModal } from './../ConfirmationModal';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useDrag, useDrop } from 'react-dnd';
import {
  createColumnTask,
  deleteBoardColumn,
  getBoard,
  onDropTask,
  updateColumnTitle,
} from '../../features/board/boardSlice';
import { CardTask } from './../../components/cardTask/interface/cardTaskProps';
import { updateColumn, getBoardById } from '../../api';

export const Column: React.FC<ColumnProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id, title, order, tasks } = props.value;
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  const { boardTasks, startColumn } = useAppSelector((state) => state.boardReducer);
  const userId = useAppSelector((state) => state.userReducer.user.id);
  const [isEditTitle, setEditTitle] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [open, setOpen] = useState<boolean>(false);
  const [isModalConfirmationOpen, setModalConfirmatioOpen] = useState<boolean>(false);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: boardTasks.map(({ id }) => id),
    drop: (item: DropItem) => handleDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [forms, setForm] = useState<TaskRequest>({
    title: '',
    description: '',
    userId,
  });

  const isActive = isOver && canDrop;
  const columnBg = isActive ? '#dfdfdf' : '#f5f5f5';

  const submitEditTitle = () => {
    setEditTitle(false);
    dispatch(updateColumnTitle({ boardId, id, title: newTitle, order }));
  };

  const cancelEditTitle = () => {
    setEditTitle(false);
  };

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewTitle(title);
  };

  const changeModalHandler = (event: FormEvent) => {
    setForm({ ...forms, [event.target.name]: event.target.value });
  };

  const createNewTask = () => {
    handleClose();
    dispatch(createColumnTask({ boardId, columnId: id, body: forms }));
  };

  const deleteColumn = () => {
    dispatch(deleteBoardColumn({ boardId, columnId: id }));
  };

  const handleDrop = (item: DropItem) => {
    const task: CardTask = boardTasks.filter(({ id }) => id === item.id)[0];
    const taskid = task.id;
    const body = {
      title: task.title,
      description: task.description,
      userId,
    };
    dispatch(
      onDropTask({
        boardId,
        startColumnId: startColumn,
        endColumnId: id,
        taskId: taskid,
        body,
        taskInfo: task,
      })
    );
  };

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: id,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
      end: (item, monitor) => {
        const dropResultColumn = monitor.getDropResult<ColumnDropType>();
        if (id !== dropResultColumn?.id) {
          const newOrder = { title, order: dropResultColumn!.order };
          updateColumn(boardId, id, newOrder);
          getBoardById(boardId).then((data) => {
            dispatch(getBoard(data));
          });
        }
      },
    }),
    [id]
  );
  const columns: ColumnDropType[] = useAppSelector((state) => state.boardReducer.board.columns);

  const [{ isOverColumn, canDropColumn }, dropColumn] = useDrop({
    accept: columns.map(({ id }) => id),
    drop: () => ({ order, id, title, tasks }),
    collect: (monitor) => ({
      isOverColumn: !!monitor.isOver(),
      canDropColumn: monitor.canDrop(),
    }),
  });

  const ref = useRef<HTMLDivElement>(null);
  drag(dropColumn(ref));

  const sortTasks = [...tasks].sort((task1, task2) => task1.order - task2.order);

  return (
    <div>
      <ConfirmationModal
        open={isModalConfirmationOpen}
        thingToBeRemoved="column"
        setOpenModal={setModalConfirmatioOpen}
        deleteFn={deleteColumn}
      />
      <Card sx={{ backgroundColor: columnBg, width: 400, userSelect: 'none' }} ref={drop}>
        <CardContent ref={ref} style={{ opacity }} id={id}>
          {isEditTitle ? (
            <Stack spacing={2} direction="row" alignItems="center" marginBottom={2}>
              <TextField
                label={title}
                variant="standard"
                sx={{ fontSize: 18, display: 'block', height: 50, textTransform: 'uppercase' }}
                onChange={changeTitleHandler}
              />
              <Button variant="contained" onClick={submitEditTitle}>
                {t('pages.board.colBtns.submit')}
              </Button>
              <Button variant="outlined" onClick={cancelEditTitle}>
                {t('pages.board.colBtns.cancel')}
              </Button>
            </Stack>
          ) : (
            <Typography
              sx={{ fontSize: 18, display: 'block', height: 50, marginBottom: 2 }}
              variant="overline"
              onClick={() => {
                setEditTitle(true);
              }}
            >
              {title}
            </Typography>
          )}

          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
            marginBottom={4}
          >
            <Button variant="contained" onClick={handleOpen}>
              {t('pages.boardPage.taskBtn')}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setModalConfirmatioOpen(true);
              }}
            >
              {t('pages.boardPage.deleteColumnBtn')}
            </Button>
          </Stack>
          <div className="column-tasks">
            {tasks.length ? (
              sortTasks.map((task) => <Task key={task.id} value={task} columnId={id} />)
            ) : (
              <AddCardIcon fontSize="large" color="primary" sx={{ ml: '166px' }} />
            )}
          </div>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-ct">
          <h2 className="modal-ct__text">{t('column.titleModal')}</h2>
          <div className="modal-ct__input">
            <TextField
              name="title"
              id="standard-basic"
              label={t('column.title.label')}
              placeholder={t('column.title.placeholder')}
              variant="standard"
              required
              onChange={changeModalHandler}
            />
          </div>
          <div className="modal-ct__input">
            <TextField
              name="description"
              id="standard-basic"
              label={t('column.description.label')}
              placeholder={t('column.description.placeholder')}
              variant="standard"
              required
              onChange={changeModalHandler}
            />
          </div>
          <Button id="modal-ct__btn" variant="outlined" onClick={createNewTask}>
            {t('column.btn')}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
