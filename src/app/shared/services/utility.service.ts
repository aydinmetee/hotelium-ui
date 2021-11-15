import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';
import { LocalStorageService } from './local-storage.service';
import { ProgressButtonService } from './progress-button.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(
    public builder: FormBuilder,
    public localStorageService: LocalStorageService,
    public dateService: DatePipe,
    public translateService: TranslateService,
    public loginloader: LoadingService,
    public alertService: AlertService,
    public progressButtonService: ProgressButtonService
  ) {}
}
