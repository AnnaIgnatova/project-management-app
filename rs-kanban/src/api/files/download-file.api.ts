import { APIService } from '../../services';

export const downloadFile = (taskId: string, filename: string) => {
  const url = `/file/${taskId}/${filename}`;
  return APIService.get<void>(url);
};
