import { Injectable } from '@angular/core';
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SystemConfig} from "../../../util/SystemConfig";
import {Categories, CategoriesRequest} from "../model/Categories";

const token = localStorage.getItem('access_token');
const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + token,
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

  getListCategories() {
    return this.http
      .get<any>(SystemConfig.getBaseUrl() + `/api/v1/admin/categories`, {
        headers,
      })
      .pipe(
        catchError((httpError: any) => {
          return throwError(httpError);
        })
      );
  }

  createCategories(request: CategoriesRequest) {
    return this.http
      .post<any>(
        SystemConfig.getBaseUrl() + '/api/v1/admin/categories',
        JSON.stringify(request),
        {headers}
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(()=>{
          this.RefreshData.next()
        })
      );
  }

  updateCategories(request: Categories) {
    return this.http
      .put<any>(
        SystemConfig.getBaseUrl() + '/api/v1/admin/categories',
        JSON.stringify(request),
        {headers}
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(()=>{
          this.RefreshData.next()
        })
      );
  }

  disableCategories(id: number, status: number) {
    return this.http
      .put<any>(
        SystemConfig.getBaseUrl() + `/api/v1/admin/categories/update/status?id=${id}&status=${status}`,{},
        {headers}
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(()=>{
          this.RefreshData.next()
        })
      );
  }

  getDetail(id : number) {
    return this.http
      .get<any>(
        SystemConfig.getBaseUrl() + '/api/v1/admin/categories/detail?id=' + id,
        {headers}
      )
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
