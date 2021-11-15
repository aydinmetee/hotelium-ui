import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestClientService {
  public access_token: string;

  constructor(
    public router: Router,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public get(url: string, options?): Observable<any> {
    const authOptions = this.createAuthorizedRequestOptions(options);

    return this.httpClient
      .get(url, authOptions)
      .pipe(catchError(this.handlerError));
  }

  public post(url: string, body: string, options?): Observable<any> {
    const authOptions = this.createAuthorizedRequestOptions(options);

    return this.httpClient
      .post(url, body, authOptions)
      .pipe(catchError(this.handlerError));
  }

  public put(url: string, body: string, options?): Observable<any> {
    const authOptions = this.createAuthorizedRequestOptions(options);

    return this.httpClient
      .put(url, body, authOptions)
      .pipe(catchError(this.handlerError));
  }

  public delete(url: string, options?): Observable<any> {
    const authOptions = this.createAuthorizedRequestOptions(options);

    return this.httpClient
      .delete(url, authOptions)
      .pipe(catchError(this.handlerError));
  }

  public createAuthorizedRequestOptions(options?) {
    this.access_token = this.localStorageService.getItem('TOKEN');
    let authOptions;
    authOptions = { headers: new HttpHeaders() };
    authOptions.headers = new HttpHeaders();
    authOptions.headers = authOptions.headers
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + this.access_token)
      .append('Accept', 'application/json');

    return authOptions;
  }

  public handlerError = (error) => {
    try {
      if (error.json().error === 'invalid_token') {
        this.router.navigateByUrl('/login');
      }
    } catch (err) {}
    // show error alert
    console.log('alert', error);
    return throwError(error);
  };
}
