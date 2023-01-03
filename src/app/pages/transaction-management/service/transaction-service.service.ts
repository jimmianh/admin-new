import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {SystemConfig} from "../../../util/SystemConfig";


const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + SystemConfig.getTokenTest(),
  'content-type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})


export class TransactionService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  getPageTransaction(offset: number, limit: number) {
    return this.http
      .get<any>(SystemConfig.getBaseUrl() + `/api/v1/admin/transactions?offset=${offset}&limit=${limit}`, {
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

  search(filter: any) {
    return this.http
      .post<any>(SystemConfig.getBaseUrl() + `/api/v1/admin/transactions/search`,
        JSON.stringify(filter),
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
