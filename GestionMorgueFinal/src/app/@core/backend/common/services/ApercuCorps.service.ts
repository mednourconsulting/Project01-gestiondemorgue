

import {HttpService} from '../api/http.service';
import {ApercuCorps} from '../model/ApercuCorps';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { CountriesApi } from '../api/countries.api';
import { CountryData, Country } from '../../../interfaces/common/countries';
import {HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import Any = jasmine.Any;

@Injectable()
export class ApercuCorpsService {
  private baseurl = 'apercuCorps';


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpService) {
  }

  // POST
  public create(data: ApercuCorps): Observable<ApercuCorps> {
    return this.http.post(this.baseurl + '/create', data, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  // PUT
  public update(data: ApercuCorps): Observable<ApercuCorps> {
    return this.http.put(this.baseurl + '/update', data, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }



  // Get
  public getAll(): Observable<Array<ApercuCorps>> {
    return this.http.get(this.baseurl + '/getAll/'  )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  // DELETE
  public delete(id: number): Observable<ApercuCorps> {
    return this.http.delete(this.baseurl + '/delete/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  // Get getById
  public getById(id: number) {
    return this.http.get(this.baseurl + '/getById/' + id, this.httpOptions )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  // Error handling
  public errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
