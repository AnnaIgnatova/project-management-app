import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { CardTaskData } from './interface/cardTaskProps';
import './style.scss';
import { clearTask, getTask } from '../../features/task/taskSlice';
import { ModalWindow } from './ModalWindow';
import { useTranslation } from 'react-i18next';
import { useDrag } from 'react-dnd';
import { getStartDragColumn } from '../../features/board/boardSlice';
import { getTaskData } from '../../features/task/taskSlice';

export const CardTask: React.FC<CardTaskData> = (props) => {
  const { columnId } = props;
  const { id, title, userId, description } = props.value;
  //(
  const { order } = props.value;
  //)
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.taskReduser.task);
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  const [open, setOpen] = useState(false);
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: id,
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
    }),
    [name, id]
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(clearTask());
  };

  const getValueTask = (event: React.MouseEvent) => {
    const taskId = event.currentTarget.id;
    handleOpen();
    dispatch(getTaskData({ boardId, columnId, taskId }));
  };

  return (
    <div>
      <Card
        sx={{ maxWidth: 345, marginBottom: 2 }}
        id={id}
        onClick={getValueTask}
        ref={drag}
        style={{ opacity }}
        onMouseDown={() => {
          dispatch(getStartDragColumn(columnId));
        }}
      >
        <CardContent>
          <Typography variant="overline" fontSize={20} component="div">
            {title} {`order ${order}`}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('task.responsible')}: {userId}
          </Typography>
        </CardContent>
      </Card>
      <ModalWindow open={open} onClose={handleClose} value={task} />
    </div>
  );
};
