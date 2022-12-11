import { Injectable } from '@angular/core';
import { Oauth2Service } from 'src/app/shared/services/oauth2.service';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _oauth2Service: Oauth2Service) { }

  public getRegisterInfo(register:Register, cb?, err?): void {
    console.log('auth servis');
    this._oauth2Service
      .register(register, () => {
        console.log('register success');

        if (cb) {
          cb();
        }
      })
      .subscribe(null, err);
  }
}
