import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LabelValue } from '../models/label-value';
import { PaginationResult } from '../models/pagination-result';
import { RestClientService } from './rest-client.service';

@Injectable()
export class RestService {
  constructor(public restClientService: RestClientService) {}

  get apiUrl(): string {
    throw new Error('api url not found!');
  }

  public findPageableObjects(
    pageNumber: number,
    pageInSize: number,
    sort: any,
    searchObject: any
  ): Observable<PaginationResult<any>> {
    const url =
      this.apiUrl +
      '/search?page=' +
      pageNumber +
      '&size=' +
      pageInSize +
      '&sort=' +
      sort;
    return this.restClientService
      .post(url, JSON.stringify(searchObject))
      .pipe(catchError(this.handleError));
  }

  public findObject(objectId: string): Observable<any> {
    const url = this.apiUrl + '/';
    return this.restClientService
      .get(url + objectId)
      .pipe(catchError(this.handleError));
  }

  public getSingle<T>(query): Observable<T> {
    return this.getList(query).pipe(map((res) => res[0] as T));
  }

  public createObject(object: any): Observable<any> {
    return this.restClientService
      .post(this.apiUrl, JSON.stringify(object))
      .pipe(catchError(this.handleError));
  }

  public updateObject(object: any): Observable<any> {
    return this.restClientService
      .put(this.apiUrl + '/' + object.id, JSON.stringify(object))
      .pipe(catchError(this.handleError));
  }

  public deleteObject(object: any): Observable<any> {
    return this.restClientService
      .delete(this.apiUrl + '/' + object.id)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: Error) {
    return throwError(error);
  }

  public getList<T>(searchArgs: any = {}): Observable<T[]> {
    return this.findPageableObjects(0, 300, 'creDate,ASC', searchArgs).pipe(
      map((result) => result.content)
    );
  }

  public getOptionList({
    searchArgs = {},
    label = 'name',
    value = 'id',
  } = {}): Observable<LabelValue<string, string>[]> {
    return this.getList<any>(searchArgs).pipe(
      map((result) =>
        result.map((item) => ({ label: item[label], value: item[value] }))
      )
    );
  }
}
