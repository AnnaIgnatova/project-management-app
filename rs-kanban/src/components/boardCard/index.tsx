import './style.scss';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store';
import { addBoardId } from '../../features/boards/boardsSlice';
import { BoardCardProps } from './interfaces/boardProps';
import { MouseEvent, useEffect, useState } from 'react';
import { getRandomColor } from '../../services/utils/getRandomColor';
import { Box } from '@mui/system';

export const BoardCard: React.FC<BoardCardProps> = (props) => {
  const { id, title, description } = props.boardData;
  const { setOpenModal, setBoardId } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [bgColor, setBgColor] = useState<string>('');

  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);

  const saveBoardId = () => {
    dispatch(addBoardId(id));
  };

  const cardHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('board-card-btn')) {
      setOpenModal(true);
      setBoardId(id);
    } else {
      saveBoardId();
      navigate('/board');
    }
  };

  return (
    <>
      <Card
        className="board-card"
        variant="outlined"
        sx={{
          backgroundColor: bgColor,
        }}
        onClick={cardHandler}
      >
        <CardContent>
          <Box display="flex">
            <AssignmentIcon />
            <Typography
              variant="h3"
              component="div"
              fontSize={26}
              fontWeight={500}
              textTransform="uppercase"
              marginLeft={2}
            >
              {title}
            </Typography>
          </Box>

          <Typography variant="h3" component="div" fontSize={20} marginTop={2}>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" className="board-card-btn" variant="outlined" color="error">
            {t('pages.main.cardBtn')}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
