import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LabelValue } from '../models/label-value';
import { Urls } from '../models/urls';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root',
})
export class ComboService {
  public apiUrl: string = Urls.BASE_URL.toString() + '/combo';

  constructor(private _http: RestClientService) {}

  public getRoomsList(status?: any): Observable<LabelValue<string, string>[]> {
    let body = {
      valid: true,
      status: null,
    };
    if (status) {
      body.status = status;
    }
    return this._http.post(`${this.apiUrl}/rooms`, JSON.stringify(body)).pipe(
      map((arr) =>
        arr.map((item) => {
          return { label: item.key, value: item.value };
        })
      )
    );
  }

  public getCompanyList(): Observable<LabelValue<string, string>[]> {
    let body = {};
    return this._http
      .post(`${this.apiUrl}/companys`, JSON.stringify(body))
      .pipe(
        map((arr) =>
          arr.map((item) => {
            return { label: item.key, value: item.value };
          })
        )
      );
  }

  public getCustomersList(): Observable<LabelValue<string, string>[]> {
    let body = {};
    return this._http
      .post(`${this.apiUrl}/customers`, JSON.stringify(body))
      .pipe(
        map((arr) =>
          arr.map((item) => {
            return { label: item.key, value: item.value };
          })
        )
      );
  }

  public getDrawees(
    reservationMasterId: string
  ): Observable<LabelValue<string, string>[]> {
    return this._http.get(`${this.apiUrl}/drawee/${reservationMasterId}`).pipe(
      map((arr) =>
        arr.map((item) => {
          console.log(item);
          return {
            label: item.key,
            value: item.value,
            additionalData: item.additionalData,
          };
        })
      )
    );
  }

  public getCountryList(): Observable<LabelValue<string, string>[]> {
    return this._http
      .get(`${this.apiUrl}/countries`)
      .pipe(
        map((arr) =>
          arr.map((item) => {
            return { label: item.key, value: item.value };
          })
        )
      );
  }

  public getCityList(countryId:string): Observable<LabelValue<string, string>[]> {
    return this._http
      .get(`${this.apiUrl}/cities/${countryId}`)
      .pipe(
        map((arr) =>
          arr.map((item) => {
            return { label: item.key, value: item.value };
          })
        )
      );
  }

  public getTownList(cityId:string): Observable<LabelValue<string, string>[]> {
    return this._http
      .get(`${this.apiUrl}/towns/${cityId}`)
      .pipe(
        map((arr) =>
          arr.map((item) => {
            return { label: item.key, value: item.value };
          })
        )
      );
  }

  public getOrganizationList(): Observable<LabelValue<string, string>[]> {
    return this._http.getNoSession(`${this.apiUrl}/orgs`).pipe(
      map((arr) =>
        arr.map((item) => {
          return { label: item.key, value: item.value };
        })
      )
    );
  }
}
