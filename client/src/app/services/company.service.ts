import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../shared/models/covenant-company';

@Injectable()
export class CompanyService {
    private readonly URL = `/api/company`;

    constructor(protected httpClient: HttpClient) {
    }

    public list(): Observable<Array<Company>> {
        return this.httpClient.get<Array<Company>>(this.URL);
    }

    public get(): Observable<Array<Company>> {
        return this.httpClient.get<Array<Company>>(this.URL);
    }

    public create(company: Company): Observable<Company> {
        return this.httpClient.post<Company>(this.URL, company);
    }

    public remove(company: Company): Observable<Company> {
        return this.httpClient.delete<Company>(`${this.URL}/${company.id}`);
    }

    public update(company: Company): Observable<Company> {
        return this.httpClient.put<Company>(`${this.URL}/${company.id}`, company);
    }

    public count(): Observable<number> {
        return this.httpClient.get<number>(`${this.URL}/count`);
    }
}
