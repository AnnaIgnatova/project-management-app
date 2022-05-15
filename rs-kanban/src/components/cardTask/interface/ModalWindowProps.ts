import { TaskType } from 'features/task/taskSlice';

export interface ModalWindowProps {
  open: boolean;
  onClose: () => void;
  value: TaskType;
}
