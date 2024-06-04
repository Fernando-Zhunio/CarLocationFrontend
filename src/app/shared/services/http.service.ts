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

  get(path: string, options: IOptionsRequest = {}) {
    return this.http.get(this.getBuildUrl(path), {...options});
  }

  post(path: string, body: any, options: IOptionsRequest = {}) {
    return this.http.post(this.getBuildUrl(path), body, {...options});
  }

  put(path: string, body: any, options: IOptionsRequest = {}) {
    return this.http.put(this.getBuildUrl(path), body, {...options});
  }

  delete(url: string, options: IOptionsRequest = {}) {
    return this.http.delete(this.getBuildUrl(url), {...options});
  }
}
