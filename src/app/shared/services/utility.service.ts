import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from './alert.service';
import { ComboService } from './combo.service';
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
    public confirmationService: ConfirmationService,
    public dateService: DatePipe,
    public translateService: TranslateService,
    public loginloader: LoadingService,
    public alertService: AlertService,
    public progressButtonService: ProgressButtonService,
    public comboService: ComboService,
    public router: Router
  ) {}
}
