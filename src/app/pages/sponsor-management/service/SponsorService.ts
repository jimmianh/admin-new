import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {SystemUtil} from "../../../util/SystemUtil";

const token = localStorage.getItem('access_token');
const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + token,
  'content-type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})


export class SponsorService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  getPage(offset: number, limit: number, keyword: string, status: any) {
    let query = `/api/v1/admin/sponsors?offset=${offset}&limit=${limit}`;
    if (status){
      query += `&status=${status}`
    }
    if (keyword){
      query += `&keyword=${keyword}`
    }
    return this.http
      .get<any>(SystemUtil.getBaseUrl() + query, {
        headers,
      })
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(()=>{
          this.RefreshData.next()
        })
      );
  }

  updateStatus(id: number, status : number) {
    return this.http
      .put<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/sponsors/update/status?id=${id}&status=${status}`,{},
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

  create(sponsor: any) {
    return this.http
      .post<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/sponsors`,
        JSON.stringify(sponsor),
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

  getDetail(id: number){
    return this.http
      .get<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/sponsors/detail?id=${id}`,
        {headers})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
      );
  }

  update(sponsor: any) {
    return this.http
      .put<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/sponsors`,
        JSON.stringify(sponsor),
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

  getAllSponsorActive() {
    return this.http
      .get<any>(SystemUtil.getBaseUrl() + `/api/v1/sponsors/all`)
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
