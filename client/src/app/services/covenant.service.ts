import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Covenant } from '../shared/models/covenant';

@Injectable()
export class CovenantService {

    private readonly URL = `/api/covenant`;

    constructor(protected httpClient: HttpClient) {
    }

    public list(): Observable<Array<Covenant>> {
        return this.httpClient.get<Array<Covenant>>(this.URL);
    }

    public get(id: string): Observable<Covenant> {
        return this.httpClient.get<Covenant>(`${this.URL}/${id}`);
    }

    public create(covenant: Covenant, companyId: string): Observable<Covenant> {
        return this.httpClient.post<Covenant>(`/api/company/covenant/${companyId}`, covenant);
    }

    public remove(covenant: Covenant): Observable<Covenant> {
        return this.httpClient.delete<Covenant>(`${this.URL}/${covenant.id}`);
    }

    public update(covenant: Covenant): Observable<Covenant> {
        return this.httpClient.put<Covenant>(`${this.URL}/${covenant.id}`, covenant);
    }

    public count(): Observable<number> {
        return this.httpClient.get<number>(`${this.URL}/count`);
    }
}
