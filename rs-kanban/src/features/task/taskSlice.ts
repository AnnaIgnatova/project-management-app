import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  task: TaskType;
}
export interface TaskType {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: FilesTaksType[];
}

interface FilesTaksType {
  taskId: string;
  file: string;
}

const initialState: InitialState = {
  task: {
    id: '',
    title: '',
    order: 1,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
    files: [],
  },
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTask: (state, action) => {
      state.task = { ...action.payload };
    },
  },
});

export const { getTask } = taskSlice.actions;
export default taskSlice.reducer;
