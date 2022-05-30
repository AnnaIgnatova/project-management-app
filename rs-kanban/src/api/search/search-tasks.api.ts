import { SearchTaskType } from '../../models/search.type';
import { APIService } from '../../services';

export const getAllTaskSearch = () => {
  const url = '/search/tasks';
  return APIService.get<SearchTaskType[]>(url);
};
