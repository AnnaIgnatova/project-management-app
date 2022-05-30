import { Card, CardContent, Typography } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { CardTaskData } from './interface/cardTaskProps';
import './style.scss';
import { clearTask, getTaskData } from '../../features/task/taskSlice';
import { ModalWindow } from './ModalWindow';
import { useDrag, useDrop } from 'react-dnd';
import {
  getStartDragColumn,
  updateTasksInColumnInRedux,
  getTasks,
} from '../../features/board/boardSlice';
import { getAllTasks, updateTask } from '../../api/tasks';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getUserById } from '../../api/users';

export const CardTask: React.FC<CardTaskData> = (props) => {
  const { columnId } = props;
  const { id, title, userId, description, order } = props.value;
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.taskReducer.task);
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>('loading...');

  const { boardTasks } = useAppSelector((state) => state.boardReducer);

  interface DropResult {
    order: number;
    columnId: string;
    id: string;
  }

  const bodyForUpdate = {
    order,
    userId,
    boardId,
    columnId,
    description,
    title,
  };

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: id,
      item: { id, order },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (id !== dropResult?.id) {
          if (columnId === dropResult?.columnId) {
            const newBodyForUpdate = { ...bodyForUpdate, order: dropResult?.order };
            updateTask(boardId, columnId, id, newBodyForUpdate).then(() => {
              getAllTasks(boardId, columnId).then((response) => {
                dispatch(updateTasksInColumnInRedux(response));
                dispatch(getTasks());
              });
            });
          }
        }
      },
    }),
    [name, id]
  );

  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: boardTasks.map(({ id }) => id),
      drop: () => ({ order, columnId, id }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [order]
  );

  const handleOpen = () => {
    setOpen(true);
    getUserName();
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(clearTask());
  };

  const getValueTask = (event: React.MouseEvent) => {
    const taskId = event.currentTarget.id;
    handleOpen();
    dispatch(getTaskData({ boardId, columnId, taskId }));
  };

  const getUserName = () => {
    getUserById(userId).then((user) => {
      setName(user.name);
    });
  };

  drag(drop(ref));

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          marginBottom: 2,
          backgroundColor: isOver ? 'rgba(0, 0, 0, 0.05)' : 'white',
          cursor: 'grab',
          boxShadow: '0px 2px 5px 1px rgb(34 60 80 / 20%);',
          mr: '6px',
        }}
        id={id}
        onClick={getValueTask}
        ref={ref}
        style={{ opacity }}
        onMouseDown={() => {
          dispatch(getStartDragColumn(columnId));
        }}
      >
        <CardContent className="editIconContainer">
          <Typography variant="overline" fontSize={20} component="div">
            {title}
          </Typography>
          <EditOutlinedIcon className="editIcon" />
        </CardContent>
      </Card>
      <ModalWindow open={open} onClose={handleClose} value={task} name={name} />
    </div>
  );
};
