export interface CardTaskProps {
  value: CardTask;
}

interface FilesCardTask {
  taskId: string;
  file: string;
}

interface CardTask {
  description: string;
  files: FilesCardTask[];
  id: string;
  order: number;
  title: string;
  userId: string;
}
