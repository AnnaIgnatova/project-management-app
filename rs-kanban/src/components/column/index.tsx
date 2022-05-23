import { getAllTasks, createTask } from '../../api/tasks';
import { Box, Button, Card, CardContent, Modal, TextField, Typography, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../../store';
import { CardTask } from '../../components/cardTask';
import { ColumnProps } from './interface/columnProps';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { Task, TaskRequest } from '../../models/task.type';
import { updateColumnTitle } from '../../features/boards/boardsSlice';
import { FormEvent } from './interface/FormEvent';
import AddCardIcon from '@mui/icons-material/AddCard';

export const Column: React.FC<ColumnProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id, title, order } = props.value;
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  const userId = useAppSelector((state) => state.userReducer.user.id);
  const [isEditTitle, setEditTitle] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [forms, setForm] = useState<TaskRequest>({
    title: '',
    description: '',
    userId,
  });

  useEffect(() => {
    getAllTasks(boardId, id).then((data: Task[]) => setTasks(data));
  }, []);

  const submitEditTitle = () => {
    setEditTitle(false);
    dispatch(updateColumnTitle({ boardId, id, title: newTitle, order }));
  };

  const cancelEditTitle = () => {
    setEditTitle(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewTitle(title);
  };

  const changeHandler = (event: FormEvent) => {
    setForm({ ...forms, [event.target.name]: event.target.value });
  };

  const createNewTask = () => {
    handleClose();
    createTask(boardId, id, forms);
  };

  return (
    <div>
      <Card sx={{ backgroundColor: '#f5f5f5', width: 400 }}>
        <CardContent>
          {isEditTitle ? (
            <Stack spacing={2} direction="row" alignItems="center" marginBottom={5}>
              <TextField
                id="outlined-basic"
                label={title}
                variant="outlined"
                sx={{ fontSize: 18, display: 'block', height: 50, textTransform: 'uppercase' }}
                onChange={handleChange}
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
              sx={{ fontSize: 18, display: 'block', height: 50, marginBottom: 5 }}
              variant="overline"
              onClick={() => {
                setEditTitle(true);
              }}
            >
              {title}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ height: '30px', marginLeft: '118px', marginBottom: '30px' }}
            onClick={handleOpen}
          >
            {t('pages.boardPage.taskBtn')}
          </Button>
          <div className="column-tasks">
            {tasks.length ? (
              tasks.map((task: Task) => <CardTask key={task.id} value={task} />)
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
              onChange={changeHandler}
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
              onChange={changeHandler}
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
