import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Address } from '../shared/models/address';

@Injectable()
export class AddressService {

    private readonly URL = `/api/address`;

    constructor(protected httpClient: HttpClient) {
    }

    public list(): Observable<Array<Address>> {
        return this.httpClient.get<Array<Address>>(this.URL);
    }

    public get(id: string): Observable<Address> {
        return this.httpClient.get<Address>(`${this.URL}/${id}`);
    }

    public create(address: Address): Observable<Address> {
        return this.httpClient.post<Address>(this.URL, address);
    }

    public remove(address: Address): Observable<Address> {
        return this.httpClient.delete<Address>(`${this.URL}/${address.id}`);
    }

    public update(address: Address): Observable<Address> {
        return this.httpClient.put<Address>(`${this.URL}/${address.id}`, address);
    }
}
