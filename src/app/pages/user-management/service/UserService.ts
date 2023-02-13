import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {SystemUtil} from "../../../util/SystemUtil";
import {UserModel} from "../model/UserModel";

const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  'content-type': 'application/json'
});
@Injectable({
  providedIn: 'root'
})


export class UserService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  search(filter: any) {
    return this.http
      .post<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/accounts/search`,
        JSON.stringify(filter),
        {headers})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        })
      );
  }

  updateStatus(id: number, status : number) {
    return this.http
      .put<any>(SystemUtil.getBaseUrl() +
        `/api/v1/admin/accounts/update/status?accountId=${id}&status=${status}`,{},
        {headers})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(()=>{
          this.RefreshData.next()
        })
      );
  }


  getDetail(id: string | null){
    return this.http
      .get<UserModel>(SystemUtil.getBaseUrl() + `/api/v1/admin/accounts/detail?accountId=${id}`,
        {headers})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
      );
  }

  update(user: any) {
    return this.http
      .put<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/update`,
        JSON.stringify(user),
        {headers})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(()=>{
          this.RefreshData.next()
        })
      );
  }
}
