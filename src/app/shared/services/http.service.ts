import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOptionsRequest } from 'src/app/core/types/request';
import { environment } from 'src/environments/environment';
import { GenerateGuid } from '../tools/common-tools';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = environment.apis.default.url;
  constructor(private http: HttpClient) {
    if (!localStorage.getItem('key_app')) 
    localStorage.setItem('key_app', GenerateGuid());
  }

  getBuildUrl(path: string) {
    return this.url+'/' + path;
  }

  get<T = any>(path: string, options: IOptionsRequest = {}) {
    return this.http.get<T>(this.getBuildUrl(path), {...options});
  }

  post<T = any>(path: string, body: any, options: IOptionsRequest = {}) {
    return this.http.post<T>(this.getBuildUrl(path), body, {...options});
  }

  put<T = any>(path: string, body: any, options: IOptionsRequest = {}) {
    return this.http.put<T>(this.getBuildUrl(path), body, {...options});
  }

  delete<T = any>(url: string, options: IOptionsRequest = {}) {
    return this.http.delete<T>(this.getBuildUrl(url), {...options});
  }
}
