import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {SystemUtil} from "../../../util/SystemUtil";
import {CampaignModel} from "../model/CampaignModel";


const headers: HttpHeaders = new HttpHeaders({
  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  'content-type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})


export class CampaignService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  getPageCampaign(offset: number, limit: number) {
    return this.http
      .get<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/campaigns?offset=${offset}&limit=${limit}`, {
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

  getDetail(id: string | null) {
    let urlDetail = SystemUtil.getBaseUrl() + `/api/v1/admin/campaigns/detail?id=${id}`;
    return this.http
      .get<CampaignModel>(urlDetail, {headers})
  }

  search(filter: any) {
    return this.http
      .post<any>(SystemUtil.getBaseUrl() + `/api/v1/admin/campaigns/search`,
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
    return this.http.post<any>(`${SystemUtil.getBaseUrl()}/api/v1/admin/campaigns`,
      JSON.stringify(request), {headers})
  }

  updateStatus(id: number, status: number) {
    return this.http
      .put<any>(`${SystemUtil.getBaseUrl()}/api/v1/admin/campaigns/update/status?id=${id}&status=${status}`,
        {}, {headers})
      .pipe(catchError((error: any) => {
          return throwError(error);
        }),
        tap(() => {
          this.RefreshData.next()
        }))
  }

  updateCampaign(campaign: any) {
    let url = `${SystemUtil.getBaseUrl()}/api/v1/admin/campaigns`;
    return this.http
      .put<any>(url, JSON.stringify(campaign), {headers})

  }
}
