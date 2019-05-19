import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
    errors: string[] = [];
    user: any = {};
    submitted = false;
    private alive = true;

    constructor(private router: Router,
                private authService: AuthService) {
    }

    login(): void {
        this.errors = [];
        this.submitted = true;

        this.authService.login(this.user.email, this.user.password)
            .takeWhile(() => this.alive)
            .subscribe(x => {
                if (x.auth = true) {
                    localStorage.setItem('token', x.token);
                    localStorage.setItem('userId', x.user.id.toString());
                    localStorage.setItem('role', x.user.role);
                    this.router.navigateByUrl('/portal').catch(() =>
                        this.errors.push('Ocorreu um erro')
                    );
                } else {
                    this.authFail();
                }
            }, () => {
                this.authFail();
            });
    }

    authFail(): void {
        this.submitted = false;
        this.errors.push('Não foi possivel entrar no portal, confira os dados.');
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
