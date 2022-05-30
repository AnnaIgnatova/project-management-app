import './style.scss';
import imgNotFound from '../../assets/image/not_found.png';
import { useTranslation } from 'react-i18next';
import { BoardCard } from './../../components/boardCard';
import { useAppDispatch, useAppSelector } from './../../store';
import React, { useEffect, useState, KeyboardEvent } from 'react';
import { deleteBoardCard, getBoardsData } from '../../features/boards/boardsSlice';
import { Board, SearchTaskType } from '../../models';
import { ConfirmationModal } from './../../components/ConfirmationModal';
import { getAllTasksForSearch, sortTask } from '../../features/searchTasks/searchSlice';
import { Modal, Box, Typography, Button, Card, CardActions, CardContent } from '@mui/material';

export const Main: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const boards: Board[] = useAppSelector((state) => state.boardsReducer.boards);
  const tasks: SearchTaskType[] = useAppSelector((state) => state.searchReducer.allTask);
  const searchTasks: SearchTaskType[] = useAppSelector((state) => state.searchReducer.sortTask);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isModalOpenSearch, setModalOpenSearch] = useState<boolean>(false);
  const handleOpen = () => setModalOpenSearch(true);
  const handleClose = () => setModalOpenSearch(false);
  const [boardId, setBoardId] = useState<string>('');
  const [selectData, setSelectData] = useState<string>('all');

  useEffect(() => {
    dispatch(getBoardsData());
    dispatch(getAllTasksForSearch());
  }, []);

  const deleteBoardById = () => {
    dispatch(deleteBoardCard(boardId));
    setModalOpen(false);
  };

  const getFilterData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectData(e.target.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const searchValue = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter') {
      sortTasks(searchValue);
      handleOpen();
    }
  };

  const sortTasks = (sort: string) => {
    const valuesTasks = Object.values(tasks);
    const select = selectData;
    const sortingTask = valuesTasks.filter((task) => {
      switch (select) {
        case 'title':
          return task.title.toLowerCase().includes(sort);
          break;
        case 'user.name':
          return task.user.name.toLowerCase().includes(sort);
          break;
        case 'order':
          return task.order === Number(sort);
          break;
        case 'description':
          return task.description.toLowerCase().includes(sort);
          break;
        case 'all':
          return (
            task.title.toLowerCase().includes(sort) ||
            task.user.name.toLowerCase().includes(sort) ||
            task.order === Number(sort) ||
            task.description.toLowerCase().includes(sort)
          );
          break;
        default:
          break;
      }
      return task.title.includes(sort);
    });
    dispatch(sortTask(sortingTask));
  };

  return (
    <>
      <ConfirmationModal
        open={isModalOpen}
        thingToBeRemoved="board"
        setOpenModal={setModalOpen}
        deleteFn={deleteBoardById}
      />
      <div className="main">
        <h2 className="main-title">{t('pages.main.title')}</h2>
        <hr />
        <div className="main-search">
          <input
            type="search"
            name="search"
            id="main-search"
            placeholder="Enter name task..."
            autoComplete="off"
            onKeyDown={onKeyDownHandler}
          />
          <select name="select" id="main-select-search" onChange={getFilterData}>
            <option value="all">All</option>
            <option value="title">Title</option>
            <option value="order">Order</option>
            <option value="description">Description</option>
            <option value="user.name">User name</option>
          </select>
        </div>

        <div className="main-boards">
          {boards.map((board) => (
            <BoardCard
              boardData={board}
              key={board.id}
              setOpenModal={setModalOpen}
              setBoardId={setBoardId}
            />
          ))}
        </div>
      </div>
      <Modal
        open={isModalOpenSearch}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-window-search">
          {Object.keys(searchTasks).length ? (
            Object.values(searchTasks).map((task) => {
              return (
                <Card key={task.id} sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      User: {task.user.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {task.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      order: {task.order}
                    </Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Go to board</Button>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <div className="modal-window-search__not-found">
              Nothing found for your request <br />
              <img className="modal-window-search__img-not-found" src={imgNotFound} />
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};
