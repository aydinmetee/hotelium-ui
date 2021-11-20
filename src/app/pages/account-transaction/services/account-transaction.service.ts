import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Urls } from 'src/app/shared/models/urls';
import { RestService } from 'src/app/shared/services/rest.service';

@Injectable()
export class AccountTransactionService extends RestService {
  get apiUrl() {
    return Urls.BASE_URL.toString() + '/acc';
  }

  public createObject(object: any): Observable<any> {
    return this.restClientService
      .post(this.apiUrl + '/expense', JSON.stringify(object))
      .pipe(catchError(this.handleError));
  }

  public getMontlyBalance(): Observable<any> {
    return this.restClientService.get(this.apiUrl + '/get-montly-balance');
  }

  public updateSource(object: any): Observable<any> {
    return this.restClientService.put(
      this.apiUrl + '/update-source',
      JSON.stringify(object)
    );
  }
}
