import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './shared/primeng/primeng.module';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng';
import { LoginModule } from './pages/login/login.module';
import { LoginDialogService } from './pages/login/services/login-dialog.service';
import { Oauth2Service } from './shared/services/oauth2.service';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { PagesModule } from './pages/pages.module';
import { ErrorPagesModule } from './pages/error-pages/errors-pages.module';
import { AppInjector } from './shared/services/Injector.service';
import { ColumnTranslationService } from './shared/services/column-translation.service';
import { MaskPipe, NgxMaskModule } from './shared/ngx-mask';
import localeTr from '@angular/common/locales/tr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeTr, 'tr');
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    PagesModule,
    BrowserAnimationsModule,
    RouterModule,
    PrimengModule,
    ErrorPagesModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    LoginModule,
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    MaskPipe,
    MessageService,
    ConfirmationService,
    LoginDialogService,
    ColumnTranslationService,
    Oauth2Service,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}
