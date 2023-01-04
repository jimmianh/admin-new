import {Injectable} from '@angular/core';
import {catchError, Subject, tap, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {PaymentChannel, PaymentChannelRequest} from '../model/PaymentChannel';
import {SystemUtil} from '../../../util/SystemUtil';

const token = SystemUtil.getTokenTest();
const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + token,
  'content-type': 'application/json'
});

@Injectable({
  providedIn: 'root',
})
export class PaymentChannelService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  getListPaymentChannel() {
    return this.http
      .get<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/channels`, {
        headers,
      })
      .pipe(
        catchError((httpError: any) => {
          return throwError(httpError);
        })
      );
  }

  createPaymentChannel(request: PaymentChannelRequest) {
    return this.http
      .post<any>(
        SystemUtil.getBaseUrl() + '/api/v1/admin/channels',
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

  updatePaymentChannel(request: PaymentChannel) {
    return this.http
      .put<any>(
        SystemUtil.getBaseUrl() + '/api/v1/admin/channels',
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

  disablePaymentChannel(id: number, status: number) {
    return this.http
      .put<any>(
        SystemUtil.getBaseUrl() + `/api/v1/admin/channels/update/status?id=${id}&status=${status}`,{},
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
        SystemUtil.getBaseUrl() + '/api/v1/admin/channels/detail?id=' + id,
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
