import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
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
export class FaqService {
  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  getPage(offset: number, limit: number, keyword: string, status: any) {
    let query = `/api/v1/admin/faqs?offset=${offset}&limit=${limit}`;
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
      .put<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/faqs/update/status?id=${id}&status=${status}`,{},
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

  create(faq: any) {
    return this.http
      .post<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/faqs`,
        JSON.stringify(faq),
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
      .get<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/faqs/detail?id=${id}`,
        {headers})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        }),
      );
  }

  update(faq: any) {
    return this.http
      .put<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/faqs`,
        JSON.stringify(faq),
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

  // getAllFaqActive() {
  //   return this.http
  //     .get<any>(SystemUtil.getBaseUrl() + `/api/v1/faqs`)
  //     .pipe(
  //       catchError((error: any) => {
  //         return throwError(error);
  //       }),
  //       tap(()=>{
  //         this.RefreshData.next()
  //       })
  //     );
  // }
}

