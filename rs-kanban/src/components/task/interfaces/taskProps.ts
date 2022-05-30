export interface TaskData {
  title: string;
  description: string;
  img?: string;
}

export interface WelcomePageTask {
  description: string;
  img?: string;
}

export interface TaskProps {
  taskData: TaskData;
}

export interface WelcomeTaskProps {
  taskData: WelcomePageTask;
}
