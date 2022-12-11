import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Register } from 'src/app/pages/register/models/register';
import { Urls } from '../models/urls';
import { LocalStorageService } from './local-storage.service';
import { RestClientService } from './rest-client.service';

@Injectable()
export class Oauth2Service {
  private CLIENT_SECRET = '123456';
  private CLIENT_ID = 'admin-server';

  constructor(
    private _http: HttpClient,
    private _restClientService: RestClientService,
    private _localStorageService: LocalStorageService
  ) {}

  public storeUserInfo(response: Response) {
    const body = response;
  }

  public login(email: string, password: string, cb: any) {
    return this._http
      .post<any>(
        `${Urls.BASE_URL.toString()}/auth/login`,
        this.oAuth2RequestBody(email, password),
        this.oAuthRequestOptions()
      )
      .pipe(
        map((res) => {
          this.handleAuthorization(res, cb);
        })
      );
  }

  public register(register:Register, cb: any) {
    return this._http
      .post<any>(
        `${Urls.BASE_URL.toString()}/auth/register`,
        {...register},
        this.oAuthRequestOptions()
      )
      .pipe(
        map((res) => {
          this.handleAuthorization(res, cb);
        })
      );
  }

  public logout() {
    return this.clearAuthentication();
  }

  public storeAuthentication(authToken: string) {
    this._restClientService.access_token = authToken;
    this._localStorageService.setItem('TOKEN', authToken);
  }

  public clearAuthentication() {
    this._restClientService.access_token = null;
    this._localStorageService.clearAll();
    if (this._restClientService.access_token === null) {
      return true;
    } else {
      return false;
    }
  }

  public handleAuthorization(authorizationInfo: any, cb) {
    this.storeAuthentication(authorizationInfo.accessToken);
    if (cb) {
      cb();
    }
  }

  public handleLoginError(error: any) {
    let msg;

    if (error.status > 200) {
      msg = JSON.parse(error._body).error_description;
    }

    return throwError(msg);
  }

  public oAuth2RequestBody(userName: string, password: string): any {
    let body = { username: userName, password: password };

    return body;
  }

  public oAuthRequestOptions() {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');

    const options = { headers };
    return options;
  }
}
