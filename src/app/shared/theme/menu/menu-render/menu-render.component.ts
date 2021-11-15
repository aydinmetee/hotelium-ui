/* tslint:disable */
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-menu-render',
  templateUrl: './menu-render.component.html',
  styleUrls: ['./menu-render.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  host: { '(click)': 'clickHandler($event)' }
})
export class MenuRenderComponent implements OnInit {

  @Input() model: any[];

  constructor() { }

  ngOnInit() {
  }

  clickHandler(e: Event) {
    e.stopPropagation();
  }


}
