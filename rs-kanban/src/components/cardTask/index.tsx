import { getTaskById } from '../../api/tasks';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { CardTaskProps } from './interface/cardTaskProps';
import './style.scss';
import { getTask } from '../../features/task/taskSlice';
import { ModalWindow } from './ModalWindow';
import { useTranslation } from 'react-i18next';

/* export const CardTask: React.FC<CardTaskProps> = (props) => { */
export const CardTask: React.FC<CardTaskProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.taskReduser.task);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id, title, userId, boardId, columnId } = props.value;

  const getValueTask = (event: React.MouseEvent) => {
    const idTask = event.currentTarget.id;
    handleOpen();
    /*     getTaskById(
      '1dc5b998-b1d2-4334-a74f-320e60d798b9', //idBoard
      'e06de5e3-017a-402a-9698-19dc6b16106e', //idColumn
      idTask
    ).then((data) => {
      dispatch(getTask(data));
    }); */

    /*     getTaskById(
      '7ab70df7-6b5e-4dc0-a23b-1c8405e3dc9f', //idBoard
      'b77e3c37-6bcd-4579-9e70-8cd981963528', //idColumn
      idTask
    ).then((data) => {
      dispatch(getTask(data));
    }); */

    getTaskById(
      boardId, //idBoard
      columnId, //idColumn
      idTask
    ).then((data) => {
      dispatch(getTask(data));
    });
  };

  return (
    <div>
      <Card sx={{ maxWidth: 245, marginBottom: 2 }} id={id} onClick={getValueTask}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
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
