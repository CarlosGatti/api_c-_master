import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../shared/models/config';

@Injectable()
export class ConfigService {

    private readonly URL = `/api/config`;

    constructor(protected httpClient: HttpClient) {
    }

    public list(): Observable<Array<Config>> {
        return this.httpClient.get<Array<Config>>(this.URL);
    }

    public get(id: string): Observable<Config> {
        return this.httpClient.get<Config>(`${this.URL}/${id}`);
    }

    public create(config: Config): Observable<Config> {
        return this.httpClient.post<Config>(this.URL, config);
    }

    public update(config: Config): Observable<Config> {
        return this.httpClient.put<Config>(`${this.URL}/${config.id}`, config);
    }
}
