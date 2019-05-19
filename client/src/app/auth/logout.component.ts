import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-login',
    template: '<h1>Saindo</h1>'
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
        AuthService.logout();
        this.router.navigateByUrl('/auth').catch();
    }
}
