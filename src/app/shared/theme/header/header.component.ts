import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fade, fadeAndSlideUp } from '../../animation/fade';
import { BaseComponent } from '../../base-component';
import { Oauth2Service } from '../../services/oauth2.service';
import { UtilityService } from '../../services/utility.service';

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

  url = location.origin + location.pathname;

  @Input() public menuHidden = false;

  constructor(
    private _oauth2Service: Oauth2Service,
    private _router: Router,
    utilServ: UtilityService
  ) {
    super(null, utilServ);
  }

  public ngOnInit() {}
}
