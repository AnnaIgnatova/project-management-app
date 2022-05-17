import { HttpMethod } from './http-methods';
import axios, { AxiosResponse } from 'axios';

function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const token = getCookie('Token');

export const instanceAxios = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export class APIService {
  public static get<Response, Request = void>(url: string, request?: Request): Promise<Response> {
    return instanceAxios({
      method: HttpMethod.GET,
      url,
      params: request,
    }).then((response: AxiosResponse<Response>) => response.data);
  }

  public static post<Response, Body = void, Request = void>(
    url: string,
    body?: Body,
    request?: Request
  ): Promise<Response> {
    return instanceAxios({
      method: HttpMethod.POST,
      url,
      params: request,
      data: body,
    }).then((response: AxiosResponse<Response>) => response.data);
  }

  public static delete(url: string) {
    return instanceAxios({
      method: HttpMethod.DELETE,
      url,
    });
  }

  public static put<Response, Body = void, Request = void>(
    url: string,
    body?: Body,
    request?: Request
  ): Promise<Response> {
    return instanceAxios({
      method: HttpMethod.PUT,
      url,
      params: request,
      data: body,
    }).then((response: AxiosResponse<Response>) => response.data);
  }
}
