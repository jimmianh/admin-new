import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PaymentChannelRequest } from '../model/PaymentChannel';
import { SystemConfig } from '../../../util/SystemConfig';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInBob25lIjoiMDk2OTQ1MTY5MSIsInByb2ZpbGVJZCI6MSwiZXhwIjoxNjcyMjk4NDAyLCJpYXQiOjE2NzIyMTIwMDIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dfQ.vn1KaN0pxm3CJyrhilCrbxnrys6KhoXuY0gc8rKlxBo';
const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + token,
});

@Injectable({
  providedIn: 'root',
})
export class PaymentChannelService {
  constructor(private http: HttpClient) {}

  getListPaymentChannel() {
    return this.http
      .get<any>(SystemConfig.getBaseUrl() + `/api/v1/admin/channels`, {
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
        SystemConfig.getBaseUrl() + '/api/v1/admin/channels',
        JSON.stringify(request),
        { headers }
      )
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }
}
