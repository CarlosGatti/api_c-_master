import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Expense } from '../shared/models/expense';
import { Link } from "../shared/models/link";

@Injectable()
export class LinkService {

    private readonly URL = `/api/link`;

    constructor(protected httpClient: HttpClient) {
    }

    public list(): Observable<Array<Link>> {
        return this.httpClient.get<Array<Link>>(this.URL);
    }

    public get(id: string): Observable<Link> {
        return this.httpClient.get<Link>(`${this.URL}/${id}`);
    }

    public create(link: Link): Observable<Link> {
        return this.httpClient.post<Link>(this.URL, link);
    }

    public remove(link: Link): Observable<Link> {
        return this.httpClient.delete<Link>(`${this.URL}/${link.id}`);
    }

    public update(link: Link): Observable<Link> {
        return this.httpClient.put<Link>(`${this.URL}/${link.id}`, link);
    }
}
