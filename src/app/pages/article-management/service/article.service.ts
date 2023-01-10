import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {SystemUtil} from "../../../util/SystemUtil";


const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  'content-type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})


export class ArticleService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  getPageArticle(offset: number, limit: number) {
    return this.http
      .get<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/articles?offset=${offset}&limit=${limit}`, {
        headers,
      })
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        })
      );
  }

  search(filter: any) {
    return this.http
      .post<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/articles/search`,
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

  create(request: any) {
    return this.http.post<any>(`${SystemUtil.getBaseUrl()}/api/v1/admin/articles`,
      JSON.stringify(request), {headers})
      .pipe(catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        }))
  }

  updateStatus(id: number, status: number) {
    return this.http
      .put<any>(`${SystemUtil.getBaseUrl()}/api/v1/admin/articles/update/status?id=${id}&status=${status}`,
      {}, {headers})
      .pipe(catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        }))
  }
}
