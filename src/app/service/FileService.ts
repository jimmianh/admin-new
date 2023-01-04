import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {SystemUtil} from "../util/SystemUtil";


@Injectable({
  providedIn: 'root'
})


export class FileService {

  private refreshData = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  get RefreshData() {
    return this.refreshData;
  }

  upload(file: File) {

    let formData = new FormData();
    formData.append("file", file);

    return this.http
      .post<any>(SystemUtil.getBaseUrl() + `/api/v1/files/upload`, formData)
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
