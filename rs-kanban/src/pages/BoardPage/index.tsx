import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../store';
import { Column } from '../../components/column';
import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getBoardById } from '../../api/boards';
import { BoardById } from '../../models/board.type';
import { addCols } from '../../features/boards/boardsSlice';
import './style.scss';

export const BoardPage: React.FC = () => {
  const { t } = useTranslation();
  const { boardId } = useAppSelector((state) => state.boardsReducer);
  const [boardByIdInfo, setBoardByIdInfo] = useState<BoardById>({ id: '', title: '', columns: [] });
  const dispatch = useAppDispatch();

  useEffect(() => {
    getBoardById(boardId).then((response) => {
      setBoardByIdInfo(response);
      dispatch(addCols(response.columns));
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
          {t('pages.boardPage.columnBtn')}
        </Button>
        <Button variant="contained" disabled={true} sx={{ height: '30px' }}>
          {t('pages.boardPage.taskBtn')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flex: '1', overflowX: 'auto', height: 'calc(100vh - 330px)' }}>
        <Box
          sx={{
            display: 'flex',
            columnGap: '20px',
          }}
        >
          {columns.map((column) => (
            <Column key={column.id} value={column} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};
