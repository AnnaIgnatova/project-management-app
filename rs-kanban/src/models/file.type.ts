export interface File {
  filename: string;
  fileSize: number;
}

export interface FileRequest {
  taskId: string;
  file: string;
}
