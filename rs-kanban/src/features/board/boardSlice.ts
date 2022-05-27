import { TaskById } from './../../models/task.type';
import { createTask, deleteTask as delTask, updateTask } from './../../api/tasks';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createColumn, deleteColumn as deleteCol, updateColumn } from './../../api/columns';
import { UpdateColTitleProps } from './../interfaces/updateTitle';
import {
  BoardState,
  ColumnTaskProps,
  CreateColumnData,
  DeleteColumnData,
  DeleteTaskProps,
  DroppedTaskData,
  TaskUpdatePayload,
} from '../interfaces/board';
import { CardTask } from './../../components/cardTask/interface/cardTaskProps';
import { ColumnById } from './../../models/column.type';

const initialState: BoardState = {
  board: { columns: [], id: '', title: '', description: '' },
  boardTasks: [],
  startColumn: '',
};

export const onDropTask = createAsyncThunk(
  'board/onDropTask',
  async (payload: DroppedTaskData, { dispatch, rejectWithValue }) => {
    try {
      const { boardId, startColumnId, endColumnId, taskId, body } = payload;
      if (startColumnId !== endColumnId) {
        await delTask(boardId, startColumnId, taskId);
        const task = await createTask(boardId, endColumnId, body);
        dispatch(addTask({ id: endColumnId, task }));
        dispatch(deleteTask({ id: startColumnId, taskId }));
        dispatch(getTasks());
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createBoardColumn = createAsyncThunk(
  'board/createBoardColumn',
  async (payload: CreateColumnData, { dispatch, rejectWithValue }) => {
    try {
      const { boardId, title } = payload;
      const column = await createColumn(boardId, { title });
      dispatch(addColumn(column));
      dispatch(getTasks());
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteBoardColumn = createAsyncThunk(
  'board/deleteBoardColumn',
  async (payload: DeleteColumnData, { dispatch, rejectWithValue }) => {
    try {
      const { boardId, columnId } = payload;
      await deleteCol(boardId, columnId);
      dispatch(deleteColumn(columnId));
      dispatch(getTasks());
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createColumnTask = createAsyncThunk(
  'board/createColumnTask',
  async (payload: ColumnTaskProps, { dispatch, rejectWithValue }) => {
    try {
      const { boardId, columnId, body } = payload;
      const task = await createTask(boardId, columnId, body);
      dispatch(addTask({ id: columnId, task }));
      dispatch(getTasks());
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateColumnTask = createAsyncThunk(
  'board/updateColumnTask',
  async (payload: TaskUpdatePayload, { dispatch, rejectWithValue }) => {
    try {
      const { taskId, body } = payload;
      const { boardId, columnId } = body;
      updateTask(boardId, columnId, taskId, body);
      dispatch(updateTaskInRedux({ taskId, body }));
      dispatch(getTasks());
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteColumnTask = createAsyncThunk(
  'board/deleteColumnTask',
  async (payload: DeleteTaskProps, { dispatch, rejectWithValue }) => {
    try {
      const { boardId, columnId, taskId } = payload;
      await delTask(boardId, columnId, taskId);
      dispatch(deleteTask({ id: columnId, taskId }));
      dispatch(getTasks());
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateColumnTitle = createAsyncThunk(
  'board/updateColumnTitle',
  async (payload: UpdateColTitleProps, { dispatch, rejectWithValue }) => {
    try {
      const { boardId, id, title, order } = payload;
      await updateColumn(boardId, id, { title, order });
      dispatch(updateColTitle({ id, title }));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoard: (state, action) => {
      state.board = action.payload;
    },
    getTasks: (state) => {
      state.boardTasks = state.board.columns.reduce(
        (acc: CardTask[], col: ColumnById) => [...acc, ...col.tasks],
        []
      );
    },
    getStartDragColumn: (state, action) => {
      state.startColumn = action.payload;
    },
    updateColTitle: (state, action) => {
      state.board.columns = state.board.columns.map((col) => {
        if (col.id === action.payload.id) {
          return { ...col, title: action.payload.title };
        }
        return col;
      });
    },
    addColumn: (state, action) => {
      state.board.columns.push({ ...action.payload, tasks: [] });
    },
    deleteColumn: (state, action) => {
      state.board.columns = [...state.board.columns.filter(({ id }) => id !== action.payload)];
    },
    addTask: (state, action) => {
      state.board.columns = state.board.columns.map((col) => {
        if (col.id === action.payload.id) {
          return { ...col, tasks: [...col.tasks, action.payload.task] };
        }
        return col;
      });
    },
    deleteTask: (state, action) => {
      state.board.columns = state.board.columns.map((col) => {
        if (col.id === action.payload.id) {
          const newTasks = col.tasks.filter((task) => task.id !== action.payload.taskId);
          return { ...col, tasks: [...newTasks] };
        }
        return col;
      });
    },
    updateTaskInRedux: (state, action) => {
      const { taskId } = action.payload;
      const { columnId, title, description, order } = action.payload.body;

      state.board.columns = state.board.columns.map((col) => {
        if (col.id === columnId) {
          const newTasks = [...col.tasks];
          const taskIndex = newTasks.findIndex((item) => item.id === taskId);
          newTasks[taskIndex] = { ...newTasks[taskIndex], title, description, order };
          return { ...col, tasks: [...newTasks] };
        }
        return col;
      });
    },

    updateTasksInColumnInRedux: (state, action: PayloadAction<TaskById[]>) => {
      const tasks = action.payload;
      const columnId = tasks[0].columnId;

      state.board.columns = state.board.columns.map((col) => {
        if (col.id === columnId) {
          const newTasks = tasks.map((task) => {
            const { id, title, description, order = 0, userId, files } = task;
            const newTask = { id, title, order, description, userId, files };
            return newTask;
          });

          return { ...col, tasks: [...newTasks] };
        }
        return col;
      });
    },
  },
});

export const {
  getBoard,
  getTasks,
  getStartDragColumn,
  addColumn,
  deleteColumn,
  addTask,
  deleteTask,
  updateColTitle,
  updateTaskInRedux,
  updateTasksInColumnInRedux,
} = boardSlice.actions;

export default boardSlice.reducer;
