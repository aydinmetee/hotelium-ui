import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StorageKeys } from 'src/app/config/storage-keys';
import { UtilityService } from 'src/app/services/global/utility.service';
import { fade, fadeAndSlideUp } from '../../animation/fade';
import { BaseComponent } from '../../modules/components/base-component';
import { Oauth2Service } from '../../services/api/authorization/oauth2.service';
import { BreadcrumbService } from '../../services/global/breadcrumb.service';
import { LoginUserService } from '../../services/global/login-user.service';
import { TokenService } from './../../services/global/token.service';
import { UserImageService } from './../../services/global/user-image.service';
import { Validators } from '@angular/forms';
import { DealerService } from 'src/app/components/page/pages/general/components/dealer/services/dealer.service';
import { BranchService } from 'src/app/services/api/general/branch.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeAndSlideUp, fade],
})
export class HeaderComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public _userImageUrl = 'assets/img/blank-user.png';
  public items: MenuItem[] = [];

  url = location.origin + location.pathname;
  dealerList;
  branchList;

  @Input() public menuHidden = false;

  constructor(
    private _loginUserService: LoginUserService,
    private _oauth2Service: Oauth2Service,
    private _router: Router,
    public _userImage: UserImageService,
    private tokenService: TokenService,
    private dealerServ: DealerService,
    private _branchService: BranchService,
    utilServ: UtilityService
  ) {
    super(null, utilServ);

    this.form = this.builder.group({
      dealerId: [null, Validators.required],
      branchId: [null, Validators.required],
    });

    this.dealerServ.getCurrentResponsible().subscribe((res) => {
      this.dealerList = res.map((i) => ({ label: i.name, value: i.id }));

      // console.log(this.dealerList)
    });
  }

  public ngOnInit() {
    console.log(this.url);

    this.transtaionInit(() => {
      this.items = [
        {
          label: this.t('top-bar.profile'),
          icon: 'fas fa-user',
          routerLink: '/page/personal',
        },
        {
          label: this.t('top-bar.logout'),
          icon: 'fas fa-power-off',
          command: () => {
            this.tokenService.close();
            this._router.navigateByUrl('/login');
            this._oauth2Service.logout();
          },
        },
      ];
    });
  }

  get user() {
    return this._loginUserService.getUser();
  }

  get userImageUrl() {
    return this._userImage.image;
  }

  get dealerImage(): string {
    return `${this.utilServ.localStorageService.getItem(
      StorageKeys.organizationCode
    )}.png`;
  }

  loginByCustomeDealer() {
    this.isDialogVisible = true;
  }

  dealerChange(dealerId: string) {
    this._branchService.setDealerId(dealerId);
    this._branchService
      .findListObjects({ dealerId })
      .pipe(map(this.toSelectedItem))
      .subscribe((data) => {
        this.branchList = data;
      });
  }

  setLogin() {
    let user = this.utilServ.loginUserService.getUser();
    this.tokenService.close();

    this._oauth2Service.logout();

    this._router.navigateByUrl('/login');
    localStorage.setItem(
      'customLogin',
      JSON.stringify({
        ...this.form.value,
        email: user.email,
        dealerName: this.dealerList.find(
          (i) => i.value === this.form.value.dealerId
        ).label,
      })
    );
    localStorage.setItem(
      'branch_dealer',
      JSON.stringify({
        ...this.form.value,
        dealerName: this.dealerList.find(
          (i) => i.value == this.form.value.dealerId
        ).label,
        branchName: this.branchList.find(
          (i) => i.value == this.form.value.branchId
        ).label,
      })
    );
  }

  get customeDealer() {
    return localStorage.getItem('dealerName');
  }
}
