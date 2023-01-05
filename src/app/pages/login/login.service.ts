import { Injectable } from '@angular/core';
import {SystemConfig} from "../../util/SystemConfig";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  postLogin(params: any): Observable<any> {
    const payload =  params;

    return this.http
      .post<any>(SystemConfig.getBaseUrl() + `/api/v1/auth/authenticate`, payload)
      .pipe(catchError((httpError: any) => {
        alert(httpError.error.message)
        return httpError
      }));
  }
}
