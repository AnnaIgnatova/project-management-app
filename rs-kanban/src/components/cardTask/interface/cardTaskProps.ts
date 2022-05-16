export interface CardTaskProps {
  value: CardTask;
}

export interface FilesCardTask {
  taskId: string;
  file: string;
}

export interface CardTask {
  description: string;
  files: FilesCardTask[];
  id: string;
  order: number;
  title: string;
  userId: string;
}
