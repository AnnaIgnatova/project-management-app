import './style.scss';

import { CardTask } from '../../components/cardTask';

const value = {
  id: '0f7bd402-07f9-422a-ad93-323f222aec91',
  title: 'testtitle',
  order: 1,
  description: 'testdescription',
  userId: '8e2ca2d1-cdc8-4de2-abbb-0b9583b9fcf6',
  files: [],
  boardId: '',
  columnId: '',
};

export const BoardPage = () => {
  return (
    <div className="board">
      board
      <CardTask value={value} />
    </div>
  );
};
