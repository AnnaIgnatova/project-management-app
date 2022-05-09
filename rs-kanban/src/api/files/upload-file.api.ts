import { APIService } from '../../services';
import { FileRequest } from '../../models';

export const uploadFile = (body: FileRequest) => {
  const url = '/file';
  return APIService.postFile<FileRequest>(url, body);
};
