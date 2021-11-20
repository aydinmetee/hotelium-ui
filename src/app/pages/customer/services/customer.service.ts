import { Injectable } from '@angular/core';
import { Urls } from 'src/app/shared/models/urls';
import { RestService } from 'src/app/shared/services/rest.service';

@Injectable()
export class CustomerService extends RestService {
  get apiUrl() {
    return Urls.BASE_URL.toString() + '/customer';
  }

  public assignCompany(customerId: string, companyId: string) {
    return this.restClientService.get(
      `${this.apiUrl}/${customerId}/assign-company/${companyId}`
    );
  }
}
