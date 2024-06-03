import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  token
  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  post(url: string, body: any) {
    return this.http.post(url, body);
  }

  put(url: string, body: any) {
    return this.http.put(url, body);
  }

  delete(url: string) {
    return this.http.delete(url);
  } 
}
