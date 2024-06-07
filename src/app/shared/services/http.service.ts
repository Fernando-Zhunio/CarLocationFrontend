import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOptionsRequest } from 'src/app/core/types/request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = environment.apis.default.url;
  constructor(private http: HttpClient) { }

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
