import { Injectable } from '@angular/core';
import { Urls } from 'src/app/shared/models/urls';
import { RestService } from 'src/app/shared/services/rest.service';

@Injectable()
export class SkuDefService extends RestService {
  get apiUrl() {
    return Urls.BASE_URL.toString() + '/sku';
  }
}
