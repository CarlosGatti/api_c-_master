import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
    selector: 'app-root',
    template: `
        <toaster-container [toasterconfig]="toasterConfig"></toaster-container>
        <router-outlet></router-outlet>`,
})
export class AppComponent {
    toasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        timeout: 4000,
        newestOnTop: true,
        tapToDismiss: true,
        // preventDuplicates: true,
        animation: 'flyRight',
        limit: 5,
    });

}
