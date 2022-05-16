import { useTranslation } from 'react-i18next';
import { getColsData } from '../../features/boards/boardsSlice';
import { useAppSelector, useAppDispatch } from '../../store';
import { Column, ColumnProps } from '../../components/column';
import './style.scss';
import { Box, Button, Container, Card, CardHeader, CardContent, Typography } from '@mui/material';
import { useEffect, useState, ReactElement } from 'react';
import { getBoardById } from '../../api/boards';
import { BoardById } from '../../models/board.type';
import { ColumnById } from '../../models/column.type';
import { TasksInColumn } from '../../models/task.type';
import { addCols } from '../../features/boards/boardsSlice';

/* export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  const columns = useAppSelector((state) => state.boardsReducer.columns);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getColsData(boardId));
  }, []);

  return (
    <div className="board-page">
      <h2 className="main-title">Board Page</h2>
      <hr />
      <div className="board-page-columns">
        {columns.map((col: ColumnProps) => (
          <Column key={col.id} id={col.id} title={col.title} order={col.order} />
        ))}
      </div>
    </div>
      );
    }; */

import { CardTask } from '../../components/cardTask';

export const BoardPage: React.FC = () => {
  const { boardId } = useAppSelector((state) => state.boardsReducer);
  const [boardByIdInfo, setBoardByIdInfo] = useState<BoardById>({ id: '', title: '', columns: [] });

  const dispatch = useAppDispatch();

  useEffect(() => {
    getBoardById(boardId).then((response) => {
      setBoardByIdInfo(response);
      dispatch(addCols(response.columns));
      console.log(response);
    });
  }, []);

  const { title, columns } = boardByIdInfo;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" align="center" sx={{ mt: '20px' }}>
        {title}
      </Typography>
      <Box
        sx={{
          height: '70px',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Button variant="contained" sx={{ height: '30px' }}>
          Create column
        </Button>
        <Button variant="contained" disabled={true} sx={{ height: '30px' }}>
          Create task
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flex: '1', overflowX: 'auto', height: 'calc(100vh - 330px)' }}>
        <Box
          sx={{
            display: 'flex',
            columnGap: '20px',
          }}
        >
          {columns.map((column, index) => (
            <Column key={index} id={column.id} title={column.title} order={column.order} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};
