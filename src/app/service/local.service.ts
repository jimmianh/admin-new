import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(
    private http: HttpClient
  ) { }
  public getHeader() {
    const auth_token = localStorage.getItem('access_token')
    return  new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
  }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  // postLogin(params: any): Observable<any> {
  //   const payload =  params;
  //
  //   return this.http
  //     .post<any>(SystemConfig.getBaseUrl() + `/api/v1/auth/authenticate`, payload , { headers : this.getHeader()})
  //     .pipe(catchError((httpError: any) => {
  //       return throwError(httpError);
  //     }));
  // }
}

