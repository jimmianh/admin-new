import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SystemUtil} from "../../util/SystemUtil";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  postLogin(params: any): Observable<any> {
    const payload =  params;

    return this.http
      .post<any>(SystemUtil.getBaseUrl() + `/api/v1/auth/authenticate`, payload)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }
}
