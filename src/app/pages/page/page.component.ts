import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from 'src/app/shared/base-component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { LoginDialogService } from '../login/services/login-dialog.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public items: MenuItem[];
  public breadcrumbItem: MenuItem[] = [];

  constructor(
    private _router: Router,
    public loginDialogService: LoginDialogService,
    utilServ: UtilityService
  ) {
    super(null, utilServ);
  }

  public ngOnInit() {}

  public ngAfterViewInit(): void {
    this.hideloader();
  }

  public ngOnDestroy(): void {}
}
