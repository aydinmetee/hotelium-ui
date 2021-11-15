import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../models/urls';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends RestService {
  get apiUrl() {
    return Urls.BASE_URL.toString() + '/menu';
  }

  public getSideBarMenu(): Observable<any> {
    return this.restClientService.get(this.apiUrl);
  }
}
