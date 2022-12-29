import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoriesList() {
    return this.http
      .get<any>(`https://herofund.up.railway.app/api/v1/categories`)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

}
