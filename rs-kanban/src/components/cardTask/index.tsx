import { getTaskById } from '../../api/tasks';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { CardTaskProps } from './interface/cardTaskProps';
import './style.scss';
import { getTask } from '../../features/task/taskSlice';
import { ModalWindow } from './ModalWindow';
import { useTranslation } from 'react-i18next';

export const CardTask: React.FC<CardTaskProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.taskReduser.task);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id, title, userId, description } = props.value;

  const getValueTask = (event: React.MouseEvent) => {
    const idTask = event.currentTarget.id;
    handleOpen();
    getTaskById(
      '1dc5b998-b1d2-4334-a74f-320e60d798b9', //idBoard
      'e06de5e3-017a-402a-9698-19dc6b16106e', //idColumn
      idTask
    ).then((data) => {
      dispatch(getTask(data));
    });
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, marginBottom: 2 }} id={id} onClick={getValueTask}>
        <CardActionArea>
          <CardContent>
            <Typography variant="overline" fontSize={20} component="div">
              {title}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('task.responsible')}: {userId}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <ModalWindow open={open} onClose={handleClose} value={task} />
    </div>
  );
};
