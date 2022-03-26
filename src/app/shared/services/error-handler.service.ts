import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginDialogService } from 'src/app/pages/login/services/login-dialog.service';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';
import { ProgressButtonService } from './progress-button.service';

@Injectable()
export class ErrorHandlerService implements HttpInterceptor {
  constructor(
    private alert: AlertService,
    private loginDialogService: LoginDialogService,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private progressButtonService: ProgressButtonService
  ) {}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.loadingService.isLoading = false;
        try {
          if (err.status == 403) {
            this.alert.error(
              this.translateService.instant('g.error'),
              'Token Expired'
            );
            this.loginDialogService.logout();
          } else {
            this.alert.error(
              this.translateService.instant('g.error'),
              err.error.message
            );
          }
          console.log(err);
        } catch (x) {
          console.log(x);
          this.alert.error(
            this.translateService.instant('g.error'),
            'Error.... '
          );
        }
        this.progressButtonService.enable();
        return throwError(err);
      })
    );
  }
}
