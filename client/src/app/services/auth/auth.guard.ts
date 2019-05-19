import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivateChild, CanActivate {
    constructor(private router: Router,
                protected httpClient: HttpClient) {
    }

    canActivateChild(next: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkToken();
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkToken();
    }

    checkToken(): any {
        const request = this.httpClient.get(`/api/login`).toPromise();
        return request.then(() => {
            return true;
        }).catch(() => {
            this.router.navigate(['/auth']).catch();
            return false;
        });
    }
}
