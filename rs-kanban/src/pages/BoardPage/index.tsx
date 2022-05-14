import { CardTask } from '../../components/cardTask';
import './style.scss';

export const BoardPage = () => {
  const exTask = [
    {
      description: 'Domestic cat needs to be stroked gently',
      files: [
        { taskId: '1', file: 'qweqweq' },
        { taskId: '2', file: 'qweqw' },
        { taskId: '3', file: 'qwe' },
      ],
      id: 'd81c06ea-778d-47fb-bdd0-9b5b881e154e',
      order: 1,
      title: 'Task: pet the cat',
      userId: '21db9a4b-042f-4a60-a36e-20c6b49bbd5d',
    },
    {
      description: 'Domestic dog needs to be stroked gently',
      files: [],
      id: 'd81c06ea-778d-47fb-bdd0-9b5b881e155e',
      order: 1,
      title: 'Task: pet the dog',
      userId: '21db9a4b-042f-4a60-a36e-20c6b49bbd5d',
    },
  ];

  return (
    <div className="board">
      {exTask.map((task) => {
        return <CardTask value={task} key={task.id} />;
      })}
    </div>
  );
};
