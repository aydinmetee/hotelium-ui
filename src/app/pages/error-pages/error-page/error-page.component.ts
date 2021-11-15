import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base-component';
import { UtilityService } from 'src/app/shared/services/utility.service';

declare var particlesJS;
declare var window: any;
declare var Stats: any;

enum Colors {
  red = '#f00',
  blue = '#009ee5',
}
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent extends BaseComponent implements OnInit {
  public errorCode = '';
  public errorMessage = '';

  public isNormalError;
  public isButtonError: boolean;

  constructor(
    private _activatedRoute: ActivatedRoute,
    utilServ: UtilityService
  ) {
    super(null, utilServ);
  }

  public ngOnInit() {
    this._activatedRoute.data.subscribe(
      (data: { code: string; message: string }) => {
        this.errorCode = data.code;
        this.errorMessage = data.message;
        let color: string;
        if (+data.code === 403 || +data.code === 404) {
          color = Colors.blue;
          this.isNormalError = true;
          this.isButtonError = true;
        } else {
          color = Colors.red;
        }

        this.hideloader();
      }
    );
  }
}
