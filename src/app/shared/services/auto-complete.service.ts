import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../models/urls';
import { RestClientService } from './rest-client.service';

@Injectable({
  providedIn: 'root',
})
export class AutoCompleteService {
  public apiUrl: string = Urls.BASE_URL.toString() + '/combo';

  constructor(private http: RestClientService) {}

  public getDrawees(query: any): Observable<any[]> {
    return this.http.post(`${this.apiUrl}/drawees`, JSON.stringify(query));
  }
}
