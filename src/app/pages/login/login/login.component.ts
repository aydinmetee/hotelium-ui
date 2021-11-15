import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeAndSlideUp } from 'src/app/shared/animation/fade';
import { BaseComponent } from 'src/app/shared/base-component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { LoginDialogService } from '../services/login-dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAndSlideUp],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public form: FormGroup;
  public now: Date = new Date();
  isLoginedByToken = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginDialogService: LoginDialogService,
    private activatedRoute: ActivatedRoute,
    utilServ: UtilityService
  ) {
    super(null, utilServ);

    this.form = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  public ngOnInit() {
    this.hideloader();
  }

  public login() {
    const formData: { email: string; password: string } = this.form.value;
    this.showLoader();
    this.loginDialogService.getLoginInfo(
      formData.email,
      formData.password,
      () => {
        this.router.navigateByUrl('/page');
      }
    );
  }

  clearLoginData() {
    localStorage.clear();
  }
}
