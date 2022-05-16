import { getAllTasks } from '../../api/tasks';
import { Card, CardContent, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppSelector } from './../../store';
import { CardTask } from '../../components/cardTask';
import { CardTask as CardData } from '../../components/cardTask/interface/cardTaskProps';

export interface ColumnProps {
  id: string;
  title: string;
  order: string;
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { id, title } = props;
  const boardId = useAppSelector((state) => state.boardsReducer.boardId);
  const [tasks, setTasks] = useState<CardData[]>([]);

  useEffect(() => {
    getAllTasks(boardId, id).then((data: CardData[]) => setTasks(data));
  }, []);

  return (
    <Card sx={{ maxWidth: 475, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} variant="overline">
          {title}
        </Typography>
        <div className="column-tasks">
          {tasks.map((task: CardData) => (
            <CardTask key={task.id} value={task} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
