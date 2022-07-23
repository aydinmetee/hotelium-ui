import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginationResult } from 'src/app/shared/models/pagination-result';
import { Urls } from 'src/app/shared/models/urls';
import { RestService } from 'src/app/shared/services/rest.service';

@Injectable()
export class ExpensesMasterService extends RestService {
  get apiUrl() {
    return Urls.BASE_URL.toString() + '/expenses';
  }

}

@Injectable()
export class ExpensesDetailService extends RestService {
  public expensesMasterId: string;

  get apiUrl() {
    return (
      Urls.BASE_URL.toString() +
      `/expenses/${this.expensesMasterId}/details`
    );
  }

  public findPageableObjects(
    pageNumber: number,
    pageInSize: number,
    sort: any,
    searchObject: any
  ): Observable<PaginationResult<any>> {
    searchObject = {
      expensesMasterId: this.expensesMasterId,
    };
    const url =
      this.apiUrl + '/search?page=' + pageNumber + '&size=' + pageInSize;
    return this.restClientService
      .post(url, JSON.stringify(searchObject))
      .pipe(catchError(this.handleError));
  }
}
