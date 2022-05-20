import { getAllTasks } from '../../api/tasks';
import { Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../../store';
import { CardTask } from '../../components/cardTask';
import { CardTask as CardData } from '../../components/cardTask/interface/cardTaskProps';
import { ColumnProps } from './interfaces/columnProps';
import './style.scss';
import { updateColumnTitle } from './../../features/boards/boardsSlice';
import { useTranslation } from 'react-i18next';

export const Column: React.FC<ColumnProps> = (props) => {
  const dispatch = useAppDispatch();
  const { id, title, order } = props;
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  const [tasks, setTasks] = useState<CardData[]>([]);
  const [isEditTitle, setEditTitle] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const { t } = useTranslation();

  useEffect(() => {
    getAllTasks(boardId, id).then((data: CardData[]) => setTasks(data));
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

  return (
    <Card sx={{ backgroundColor: '#f5f5f5', width: 400, overflowY: 'auto' }}>
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

        <div className="column-tasks">
          {tasks.map((task: CardData) => (
            <CardTask key={task.id} value={task} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
