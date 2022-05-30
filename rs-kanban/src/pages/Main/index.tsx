import './style.scss';
import imgNotFound from '../../assets/image/not_found.png';
import { useTranslation } from 'react-i18next';
import { BoardCard } from './../../components/boardCard';
import { useAppDispatch, useAppSelector } from './../../store';
import React, { useEffect, useState, KeyboardEvent } from 'react';
import { addBoardId, deleteBoardCard, getBoardsData } from '../../features/boards/boardsSlice';
import { Board, SearchTaskType } from '../../models';
import { ConfirmationModal } from './../../components/ConfirmationModal';
import { getAllTasksForSearch, sortTask } from '../../features/searchTasks/searchSlice';
import { Modal, Box, Typography, Button, Card, CardActions, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

enum SearchFilter {
  All = 'all',
  Title = 'title',
  Order = 'order',
  Description = 'description',
  User = 'user.name',
}

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
  const [placeholderSearch, setPlaceholderSearch] = useState<string>(
    t('search.placeholderSearch.all')
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

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
    switch (e.target.value) {
      case SearchFilter.All:
        setPlaceholderSearch(t('search.placeholderSearch.all'));
        break;
      case SearchFilter.Description:
        setPlaceholderSearch(t('search.placeholderSearch.description'));
        break;
      case SearchFilter.Order:
        setPlaceholderSearch(t('search.placeholderSearch.order'));
        break;
      case SearchFilter.Title:
        setPlaceholderSearch(t('search.placeholderSearch.title'));
        break;
      case SearchFilter.User:
        setPlaceholderSearch(t('search.placeholderSearch.user'));
        break;
    }
  };

  const onKeyDownHandler = (e: React.ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    console.log(value);
    setSearchValue(value);
  };

  const startSearch = () => {
    sortTasks();
    handleOpen();
  };

  const sortTasks = () => {
    const sort = searchValue;
    console.log(sort);
    const valuesTasks = Object.values(tasks);
    const select = selectData;
    const sortingTask = valuesTasks.filter((task) => {
      switch (select) {
        case SearchFilter.Title:
          return task.title.toLowerCase().includes(sort);
          break;
        case SearchFilter.User:
          return task.user.name.toLowerCase().includes(sort);
          break;
        case SearchFilter.Order:
          return task.order === Number(sort);
          break;
        case SearchFilter.Description:
          return task.description.toLowerCase().includes(sort);
          break;
        case SearchFilter.All:
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

  const goToBoard = (boardId: string) => {
    dispatch(addBoardId(boardId));
    navigate('/board');
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
            placeholder={placeholderSearch}
            autoComplete="off"
            onChange={onKeyDownHandler}
          />
          <select name="select" id="main-select-search" onChange={getFilterData}>
            <option value={SearchFilter.All}>{t('search.select.all')}</option>
            <option value={SearchFilter.Title}>{t('search.select.title')}</option>
            <option value={SearchFilter.Order}>{t('search.select.order')}</option>
            <option value={SearchFilter.Description}>{t('search.select.description')}</option>
            <option value={SearchFilter.User}>{t('search.select.user')}</option>
          </select>
          <Button variant="contained" color="success" sx={{ marginLeft: 2 }} onClick={startSearch}>
            Search
          </Button>
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
                <Card key={task.id} sx={{ width: 275, minHeight: 200 }}>
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
                    <Typography variant="body2" component="div" gutterBottom>
                      {task.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => goToBoard(task.boardId)}>
                      {t('search.btnModal')}
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <div className="modal-window-search__not-found">
              {t('search.notFound')} <br />
              <img className="modal-window-search__img-not-found" src={imgNotFound} />
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};
