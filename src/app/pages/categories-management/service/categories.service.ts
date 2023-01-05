import {Injectable} from '@angular/core';
import {catchError, Subject, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SystemUtil} from "../../../util/SystemUtil";
import {CategoriesRequest} from "../model/Categories";

const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  'content-type': 'application/json'
});

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  getListCategories(offset: number, limit: number, keyword: string, status: any) {
    let query = `/api/v1/admin/categories?offset=${offset}&limit=${limit}`;
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
        catchError((httpError: any) => {
          return throwError(httpError);
        })
      );
  }

  getListActiveCategory() {
    let query = `/api/v1/categories/active`;
    return this.http
      .get<any>(SystemUtil.getBaseUrl() + query)
      .pipe(
        catchError((httpError: any) => {
          return throwError(httpError);
        })
      );
  }

  createCategories(request: CategoriesRequest) {
    return this.http
      .post<any>(
        SystemUtil.getBaseUrl() + '/api/v1/admin/categories',
        JSON.stringify(request),
        {headers}
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        })
      );
  }

  updateCategories(request: CategoriesRequest) {
    return this.http
      .put<any>(
        SystemUtil.getBaseUrl() + '/api/v1/admin/categories',
        JSON.stringify(request),
        {headers}
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        })
      );
  }

  disableCategories(id: number, status: number) {
    return this.http
      .put<any>(
        SystemUtil.getBaseUrl() + `/api/v1/admin/categories/update/status?id=${id}&status=${status}`, {},
        {headers}
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        })
      );
  }

  getDetail(id: number) {
    return this.http
      .get<any>(
        SystemUtil.getBaseUrl() + '/api/v1/admin/categories/detail?id=' + id,
        {headers}
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        })
      );
  }
}
