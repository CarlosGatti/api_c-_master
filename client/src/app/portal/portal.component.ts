import { Component } from '@angular/core';
import { MENU_ITEMS } from './portal-menu';

@Component({
    selector: 'app-pages',
    template: `
    <app-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-sample-layout>
  `,
})
export class PortalComponent {

    menu = MENU_ITEMS;

}
