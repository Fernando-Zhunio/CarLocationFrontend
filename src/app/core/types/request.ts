import { HttpContext, HttpParams } from "@angular/common/http";

export interface IOptionsRequest {
    // headers?: HttpHeaders | {
    //     [header: string]: string | string[];
    // };
    headers?: {
        [header: string]: string | string[];}
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}