import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { fade } from './shared/animation/fade';
import { LoadingService } from './shared/services/loading.service';
import { UtilityService } from './shared/services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade],
})
export class AppComponent implements OnInit {
  title = 'hotelium-ui';
  public theme = 'nova-dark';

  constructor(
    public translate: TranslateService,
    public loadingService: LoadingService,
    public router: Router,
    public loginloader: LoadingService,
    public utilServ: UtilityService
  ) {
    translate.setDefaultLang('tr');
  }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.loginloader.isLoading = true;
      }
    });
  }
}
