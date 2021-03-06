import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginationResult } from 'src/app/shared/models/pagination-result';
import { Urls } from 'src/app/shared/models/urls';
import { RestService } from 'src/app/shared/services/rest.service';

@Injectable()
export class ReservationMasterService extends RestService {
  get apiUrl() {
    return Urls.BASE_URL.toString() + '/reservation';
  }

  public getPeriodReservations(period: 'WEEKLY' | 'MONTHLY' = 'WEEKLY') {
    return this.restClientService.get(
      `${this.apiUrl}/get-weekly-reservations/${period}`
    );
  }

  public markAsCancelled(id: string) {
    return this.restClientService.get(
      `${Urls.BASE_URL.toString()}/reservation/${id}/mark-as-cancelled`
    );
  }

  public getPayment(model: any) {
    return this.restClientService.post(
      `${Urls.BASE_URL.toString()}/reservation/${model.masterId}/get-payment`,
      JSON.stringify(model)
    );
  }
}

@Injectable()
export class ReservationDetailService extends RestService {
  public reservationMasterId: string;

  get apiUrl() {
    return (
      Urls.BASE_URL.toString() +
      `/reservation/${this.reservationMasterId}/details`
    );
  }

  public findPageableObjects(
    pageNumber: number,
    pageInSize: number,
    sort: any,
    searchObject: any
  ): Observable<PaginationResult<any>> {
    searchObject = {
      reservationMasterId: this.reservationMasterId,
    };
    const url =
      this.apiUrl + '/search?page=' + pageNumber + '&size=' + pageInSize;
    return this.restClientService
      .post(url, JSON.stringify(searchObject))
      .pipe(catchError(this.handleError));
  }

  public markAsBooking(objects: any) {
    return this.restClientService.post(
      `${Urls.BASE_URL.toString()}/reservation/${
        this.reservationMasterId
      }/mark-as-booking`,
      JSON.stringify(objects)
    );
  }

  public markAsCompleted() {
    return this.restClientService.get(
      `${Urls.BASE_URL.toString()}/reservation/${
        this.reservationMasterId
      }/mark-as-completed`
    );
  }
}
