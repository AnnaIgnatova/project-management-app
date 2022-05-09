import { HttpMethod } from './http-methods';
import axios, { AxiosResponse } from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NTg1ZDQxMi0wMTcxLTRkMjctYWIwNC0xOGM3MzI0ODY1ZDAiLCJsb2dpbiI6InVzZXIwMDMiLCJpYXQiOjE2NTIwMzgyMDR9.igZFBxuq-naJ_8xG74gtVvAD6LJIBfjBrVzt-pUiGdk';

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

  public static postSign<Response, Body = void, Request = void>(
    url: string,
    body?: Body,
    request?: Request
  ): Promise<Response> {
    return axios({
      method: HttpMethod.POST,
      url,
      params: request,
      data: body,
    }).then((response: AxiosResponse<Response>) => response.data);
  }

  public static postFile<Body = void>(url: string, body?: Body) {
    return axios({
      method: HttpMethod.POST,
      url,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
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
