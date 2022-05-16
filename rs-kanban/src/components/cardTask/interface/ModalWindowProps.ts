export interface ModalWindowProps {
  open: boolean;
  onClose: () => void;
  value: TaskType;
}

interface TaskType {
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
