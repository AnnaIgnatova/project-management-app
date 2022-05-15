import './style.scss';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store';
import { addBoardId } from '../../features/boards/boardsSlice';
import { BoardCardProps } from './interfaces/boardProps';

export const BoardCard = (props: BoardCardProps) => {
  const { id, title, colNum, tasksNum } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const saveBoardId = () => {
    dispatch(addBoardId(id));
  };

  return (
    <Card variant="outlined" sx={{ width: 375, mb: 5 }}>
      <CardContent>
        <Typography variant="overline" component="div" fontSize={24}>
          {title}
        </Typography>
        <Typography variant="body1" display="flex">
          <ViewColumnIcon />
          {t('pages.main.colNum')}: {colNum}
        </Typography>
        <Typography variant="body1" display="flex">
          <AssignmentIcon />
          {t('pages.main.taskNum')}: {tasksNum}
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
