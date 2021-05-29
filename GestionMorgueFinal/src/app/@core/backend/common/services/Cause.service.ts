

import {HttpService} from '../api/http.service';
import { Cause } from '../model/Cause';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { CountriesApi } from '../api/countries.api';
import { CountryData, Country } from '../../../interfaces/common/countries';
import {HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class CauseService {
  private baseurl = 'cause';


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpService) {
  }

  // POST
  public create(data: Cause): Observable<Cause> {
    return this.http.post(this.baseurl + '/create', data, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  // PUT
  public update(data: Cause): Observable<Cause> {
    return this.http.put(this.baseurl + '/update', data, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }


  // GetID
  public getID(): Observable<number> {
    return this.http.get(this.baseurl + '/getID/'  )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  // Get
  public getAll(): Observable<Array<Cause>> {
    return this.http.get(this.baseurl + '/getAll/'  )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  public getByDescription(Description: string) {
    return this.http.get(this.baseurl + '/getByDescription/' + Description, this.httpOptions )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  public getByCode(code: string) {
    return this.http.get(this.baseurl + '/getByCode/' + code, this.httpOptions )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  public getById(id: number) {
    return this.http.get(this.baseurl + '/getById/' + id, this.httpOptions )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  // DELETE getById
  public delete(id: number): Observable<Cause>  {
    return this.http.delete(this.baseurl + '/delete/' + id, this.httpOptions)
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
