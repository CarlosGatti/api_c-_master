import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-password-recover',
    templateUrl: 'password-recover.component.html',
    styleUrls: ['password-recover.component.scss']
})
export class PasswordRecoverComponent {

    redirectDelay = 0;
    showMessages: any = {};
    provider = '';

    submitted = false;
    errors: string[] = [];
    messages: string[] = [];
    user: any = {};

    constructor(protected router: Router) {
    }

    requestPass(): void {
        this.errors = this.messages = [];
        this.submitted = true;

        /*    this.service.requestPassword(this.provider, this.user)
              .takeWhile(() => this.alive)
              .subscribe((result: NbAuthResult) => {
              this.submitted = false;
              if (result.isSuccess()) {
                this.messages = result.getMessages();
              } else {
                this.errors = result.getErrors();
              }

              const redirect = result.getRedirect();
              if (redirect) {
                setTimeout(() => {
                  return this.router.navigateByUrl(redirect);
                }, this.redirectDelay);
              }
            });*/
    }

}
