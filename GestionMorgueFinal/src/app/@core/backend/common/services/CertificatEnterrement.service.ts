

import {HttpService} from '../api/http.service';
import { CertificatEnterrement } from '../model/CertificatEnterrement';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class CertificatEnterrementService {
  private baseurl = 'certificatEnterrement';


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpService) {
  }

  // POST
  public create(data: CertificatEnterrement): Observable<CertificatEnterrement> {
    return this.http.post(this.baseurl + '/create', data, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  // PUT
  public update(data: CertificatEnterrement): Observable<CertificatEnterrement> {
    return this.http.put(this.baseurl + '/update', data, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }



  // Get
  public getAll(): Observable<Array<CertificatEnterrement>> {
    return this.http.get(this.baseurl + '/getAll/'  )
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  // DELETE
  public delete(id: number): Observable<CertificatEnterrement>  {
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
