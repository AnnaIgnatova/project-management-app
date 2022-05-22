import './style.scss';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store';
import { addBoardId } from '../../features/boards/boardsSlice';
import { BoardCardProps } from './interfaces/boardProps';
import { MouseEvent, useEffect, useState } from 'react';
import { getRandomColor } from './../../utils/getRandomColor';

export const BoardCard: React.FC<BoardCardProps> = (props) => {
  const { id, title } = props.boardData;
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
          <AssignmentIcon />
          <Typography
            variant="h3"
            component="div"
            fontSize={20}
            textTransform="uppercase"
            marginTop={2}
          >
            {title}
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
