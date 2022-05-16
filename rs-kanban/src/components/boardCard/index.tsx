import './style.scss';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store';
import { addBoardId } from '../../features/boards/boardsSlice';
import { BoardCardProps } from './interfaces/boardProps';

export const BoardCard: React.FC<BoardCardProps> = (props) => {
  const { id, title } = props.boardData;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const saveBoardId = () => {
    dispatch(addBoardId(id));
  };

  const getRandomColor = () => {
    const red = getRandomNum();
    const green = getRandomNum();
    const blue = getRandomNum();
    return `rgba(${red}, ${green}, ${blue}, 0.2)`;
  };

  const getRandomNum = () => {
    return Math.floor(Math.random() * Math.floor(255));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 375,
        mb: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: getRandomColor(),
      }}
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
        <Link to="/board" className="board-card-btn" onClick={saveBoardId}>
          <Button size="large">{t('pages.main.cardBtn')}</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
