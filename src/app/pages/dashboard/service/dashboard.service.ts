import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SystemUtil} from "../../../util/SystemUtil";
import {catchError, Observable, throwError} from "rxjs";
import {GeneralityDto} from "../model/Dashboard";
const token = localStorage.getItem('access_token');
const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + token,
  'content-type': 'application/json'
});
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getGenerality(): Observable<GeneralityDto> {
    let url = `${SystemUtil.getBaseUrl()}/api/v1/admin/dashboard/generality`;
    return this.http
      .get<GeneralityDto>(url, {
        headers,
      })
      .pipe(
        catchError((httpError: any) => {
          return throwError(httpError);
        })
      );
  }
}
