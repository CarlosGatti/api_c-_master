import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Token } from '../../shared/models/token';
import { User } from '../../shared/models/user';

@Injectable()
export class AuthService {
    user: User;

    constructor(protected httpClient: HttpClient) {
    }

    static logout(): void {
        localStorage.clear();
    }

    public login(username: string, password: string): Observable<Token> {
        const body = { email: username, password: password };
        const url = `/api/login`;
        return this.httpClient.post<Token>(url, body);
    }
}
