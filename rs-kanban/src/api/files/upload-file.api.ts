import { APIService } from '../../services';
import { File, FileRequest } from '../../models';

export const uploadFile = (body: FileRequest) => {
  const url = '/file';
  return APIService.post<File, FileRequest>(url, body);
};
