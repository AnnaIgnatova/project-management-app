import { CardTask } from './../../components/cardTask/interface/cardTaskProps';
import { Board, Task, Column, BoardById, TaskRequestForUpdate } from './../../models';

export interface NewBoardPayload {
  title: string;
  description: string;
}

export interface BoardsState {
  boardId: string;
  boards: Board[];
  columns: Column[];
  tasks: Task[];
}

export interface DroppedTaskBodyData {
  title: string;
  description: string;
  userId: string;
}

export interface DroppedTaskData {
  boardId: string;
  startColumnId: string;
  endColumnId: string;
  taskId: string;
  body: DroppedTaskBodyData;
  taskInfo?: CardTask;
}

export interface BoardState {
  board: BoardById;
  boardTasks: CardTask[];
  startColumn: string;
}

export interface CreateColumnData {
  boardId: string;
  title: string;
}

export interface DeleteColumnData {
  boardId: string;
  columnId: string;
}

export interface ColumnTaskProps extends DeleteColumnData {
  body: DroppedTaskBodyData;
}

export interface DeleteTaskProps extends DeleteColumnData {
  taskId: string;
}

export interface TaskUpdatePayload {
  taskId: string;
  body: TaskRequestForUpdate;
}
