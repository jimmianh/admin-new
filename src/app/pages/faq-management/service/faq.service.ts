import {Injectable} from '@angular/core';
import {catchError, Subject, tap, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Faq, FaqRequest} from '../model/Faq';
import {SystemUtil} from '../../../util/SystemUtil';
import {PaymentChannel} from "../../payment-channel-management/model/PaymentChannel";

const token = localStorage.getItem('access_token');
const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + token,
  'content-type': 'application/json'
});

@Injectable({
  providedIn: 'root',
})
export class FaqService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  getPageFaq(offset: number, limit: number) {
    return this.http
      .get<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/faqs?offset=${offset}&limit=${limit}`, {
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

  // search(filter: any) {
  //   return this.http
  //     .post<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/faq/search`,
  //       JSON.stringify(filter),
  //       {headers})
  //     .pipe(
  //       catchError((error: any) => {
  //         return throwError(error);
  //       }),
  //       tap(() => {
  //         this.RefreshData.next()
  //       })
  //     );
  // }

  create(request: any) {
    return this.http.post<any>(`${SystemUtil.getBaseUrl()}/api/v1/admin/faqs`,
      JSON.stringify(request), {headers})
      .pipe(catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        }))
  }

  updateFaq(request: Faq) {
    return this.http
      .put<any>(
        SystemUtil.getBaseUrl() + '/api/v1/admin/faqs',
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

  getDetail(id: number){
    return this.http
      .get<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/faqs/detail?id=${id}`,
        {headers})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
      );
  }

  updateStatus(id: number, status: number) {
    return this.http
      .put<any>(`${SystemUtil.getBaseUrl()}/api/v1/admin/faqs/update/status?id=${id}&status=${status}`,
        {}, {headers})
      .pipe(catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        }))
  }
}
