import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/models/user';

@Injectable()
export class UserService {

    private readonly URL = `/api/user`;

    constructor(protected httpClient: HttpClient) {
    }

    public list(): Observable<Array<User>> {
        return this.httpClient.get<Array<User>>(this.URL);
    }

    public get(id: string): Observable<User> {
        return this.httpClient.get<User>(`${this.URL}/${id}`);
    }

    public count(): Observable<number> {
        return this.httpClient.get<number>(`${this.URL}/count`);
    }

    public create(user: User): Observable<User> {
        return this.httpClient.post<User>(this.URL, user);
    }

    public remove(user: User): Observable<User> {
        return this.httpClient.delete<User>(`${this.URL}/${user.id}`);
    }

    public update(user: User): Observable<User> {
        return this.httpClient.put<User>(`${this.URL}/${user.id}`, user);
    }

    public resetPassword(userId: string, objPasswordReset: any): Observable<any> {
        return this.httpClient.post<string>(`${this.URL}/ResetPassword/${userId}`, objPasswordReset);
    }
}
