import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Oauth2Service } from 'src/app/shared/services/oauth2.service';

@Injectable()
export class LoginDialogService {
  constructor(
    private _localStorageService: LocalStorageService,
    private _oauth2Service: Oauth2Service,
    private _router: Router,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  public getLoginInfo(email: string, password: string, cb?, err?): void {
    console.log('auth servis');
    this._oauth2Service
      .login(email, password, () => {
        console.log('login success');

        if (cb) {
          cb();
        }
      })
      .subscribe(null, err);
  }

  public logout() {
    this._localStorageService.clearAll();
    this._router.navigateByUrl('/login');
  }
}
