import { Component, HostListener, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { MenuService } from '../../services/menu.service';
import { UtilityService } from '../../services/utility.service';

export const MenusItems = [];
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends BaseComponent implements OnInit {
  @Input() public toggle = false;
  public hidden = false;
  public menusExpandPath: any[] = [];

  constructor(private menuService: MenuService, utilServ: UtilityService) {
    super(null, utilServ);
  }

  public items: any[];
  // url = location.origin + location.pathname;
  public async ngOnInit() {
    let menus: any = {};

    menus = {
      children: [
        {
          label: 'page.company',
          url: '/page/companys',
        },
        {
          label: 'page.customer',
          url: '/page/customers',
        },
        {
          label: 'page.rooms',
          url: '/page/rooms',
        },
        {
          label: 'page.reservation',
          url: '/page/reservations',
        },
        {
          label: 'page.account',
          url: '/page/account-transactions',
        },
      ],
    };

    setTimeout(() => {
      this.setMenusItems(menus.children);
    }, 1000);
    if (menus.children && menus.children instanceof Array) {
      (menus.children as any[]).forEach((i) => {
        switch (i.label) {
          case 'page.security.parent': {
            i.icon = 'fas fa-shield-alt';
            break;
          }
          case 'page.reservation': {
            i.icon = 'far fa-calendar-alt';
            break;
          }
          case 'page.customer': {
            i.icon = 'far fa-address-book';
            break;
          }
          case 'page.company': {
            i.icon = 'far fa-building';
            break;
          }
          case 'page.rooms': {
            i.icon = 'fas fa-bed';
            break;
          }
          case 'page.account': {
            i.icon = 'fas fa-coins';
            break;
          }
          default: {
            i.icon = 'fas fa-shield-alt';
            break;
          }
        }
      });
    }
    console.log(menus.children);
    this.items = [
      {
        icon: 'fas fa-home',
        label: 'dashboard.title',
        url: ['dashboard'],
      },
      ...menus.children,
    ];
  }

  setMenusItems(menus: any[] = []): void {
    menus.forEach((m) => {
      MenusItems.push(m);
      if (m.children) {
        this.setMenusItems(m.children);
      }
    });
  }

  @HostListener('document:click') public resetToggle() {
    this.toggle = false;
  }

  public updateExpandedState(e: MouseEvent, menu, index: number): void {
    e.stopPropagation();

    if (menu.url) {
      if (index == 0) {
        this.resetExpandedState();
      }

      return;
    }

    if (this.menusExpandPath[index] && this.menusExpandPath[index] != menu) {
      if (index === 0) {
        this.resetExpandedState();
      } else {
        this.resetExpandedStateFromIndex(index);
      }
      this.menusExpandPath[index] = menu;
    } else if (
      this.menusExpandPath[index] == menu &&
      this.menusExpandPath.length > 1
    ) {
      this.resetExpandedStateFromIndex(index + 1);
    } else {
      this.menusExpandPath[index] = menu;
    }
    this.menusExpandPath[index].expanded =
      !this.menusExpandPath[index].expanded;
  }

  public resetExpandedState(): void {
    this.menusExpandPath.forEach((m) => {
      m.expanded = false;
    });

    this.menusExpandPath = [];
  }

  public resetExpandedStateFromIndex(index: number): void {
    for (let i = index; i < this.menusExpandPath.length; i++) {
      this.menusExpandPath[i].expanded = false;
    }
    this.menusExpandPath.splice(index, this.menusExpandPath.length);
  }
}
